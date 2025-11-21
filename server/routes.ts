import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertHostelSchema, insertReviewSchema, insertBookingSchema, insertRoomSchema, insertPackageSchema } from "@shared/schema";
import { hash, compare } from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ========== Authentication Routes ==========
  
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await hash(data.password, 10);
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed after registration" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/user", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const { password: _, ...userWithoutPassword } = req.user as any;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // ========== Hostel Routes ==========
  
  app.get("/api/hostels", async (req: Request, res: Response) => {
    try {
      const { city, location, search } = req.query;
      const hostels = await storage.getHostels({
        city: city as string | undefined,
        location: location as string | undefined,
        search: search as string | undefined,
      });
      res.json(hostels);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch hostels" });
    }
  });

  app.get("/api/hostels/:id", async (req: Request, res: Response) => {
    try {
      const hostel = await storage.getHostel(req.params.id);
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }
      
      const rooms = await storage.getRoomsByHostel(req.params.id);
      const packages = await storage.getPackagesByHostel(req.params.id);
      const reviews = await storage.getReviewsByHostel(req.params.id);

      res.json({
        ...hostel,
        rooms,
        packages,
        reviewsList: reviews,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch hostel" });
    }
  });

  app.post("/api/hostels", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user as any;
      if (user.role !== 'owner' && user.role !== 'admin') {
        return res.status(403).json({ message: "Only owners can create hostels" });
      }

      const data = insertHostelSchema.parse({
        ...req.body,
        ownerId: user.id,
      });

      const hostel = await storage.createHostel(data);
      res.status(201).json(hostel);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create hostel" });
    }
  });

  app.patch("/api/hostels/:id", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user as any;
      const hostel = await storage.getHostel(req.params.id);
      
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }

      if (hostel.ownerId !== user.id && user.role !== 'admin') {
        return res.status(403).json({ message: "Not authorized" });
      }

      const updated = await storage.updateHostel(req.params.id, req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to update hostel" });
    }
  });

  app.delete("/api/hostels/:id", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user as any;
      const hostel = await storage.getHostel(req.params.id);
      
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }

      if (hostel.ownerId !== user.id && user.role !== 'admin') {
        return res.status(403).json({ message: "Not authorized" });
      }

      await storage.deleteHostel(req.params.id);
      res.json({ message: "Hostel deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete hostel" });
    }
  });

  // ========== Room Routes ==========
  
  app.post("/api/hostels/:hostelId/rooms", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const data = insertRoomSchema.parse({
        ...req.body,
        hostelId: req.params.hostelId,
      });

      const room = await storage.createRoom(data);
      res.status(201).json(room);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create room" });
    }
  });

  app.patch("/api/rooms/:id", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const updated = await storage.updateRoom(req.params.id, req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to update room" });
    }
  });

  // ========== Package Routes ==========
  
  app.post("/api/hostels/:hostelId/packages", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const data = insertPackageSchema.parse({
        ...req.body,
        hostelId: req.params.hostelId,
      });

      const pkg = await storage.createPackage(data);
      res.status(201).json(pkg);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create package" });
    }
  });

  // ========== Review Routes ==========
  
  app.post("/api/hostels/:hostelId/reviews", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user as any;
      const data = insertReviewSchema.parse({
        ...req.body,
        hostelId: req.params.hostelId,
        userId: user.id,
      });

      const review = await storage.createReview(data);
      res.status(201).json(review);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create review" });
    }
  });

  // ========== Booking Routes ==========
  
  app.get("/api/bookings", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user as any;
      const bookings = await storage.getBookingsByUser(user.id);
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user as any;
      const data = insertBookingSchema.parse({
        ...req.body,
        userId: user.id,
      });

      const booking = await storage.createBooking(data);
      res.status(201).json(booking);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create booking" });
    }
  });

  app.patch("/api/bookings/:id", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const updated = await storage.updateBooking(req.params.id, req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to update booking" });
    }
  });

  // ========== Message Routes ==========
  
  app.get("/api/messages", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user as any;
      const messages = await storage.getMessagesByUser(user.id);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
