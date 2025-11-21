import { 
  type User, type InsertUser,
  type Hostel, type InsertHostel,
  type Room, type InsertRoom,
  type Package, type InsertPackage,
  type Review, type InsertReview,
  type Booking, type InsertBooking,
  type Message, type InsertMessage,
  users, hostels, rooms, packages, reviews, bookings, messages
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, ilike, sql, or } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Hostel operations
  getHostels(filters?: { city?: string; location?: string; search?: string }): Promise<Hostel[]>;
  getHostel(id: string): Promise<Hostel | undefined>;
  createHostel(hostel: InsertHostel): Promise<Hostel>;
  updateHostel(id: string, updates: Partial<InsertHostel>): Promise<Hostel | undefined>;
  deleteHostel(id: string): Promise<void>;

  // Room operations
  getRoomsByHostel(hostelId: string): Promise<Room[]>;
  createRoom(room: InsertRoom): Promise<Room>;
  updateRoom(id: string, updates: Partial<InsertRoom>): Promise<Room | undefined>;

  // Package operations
  getPackagesByHostel(hostelId: string): Promise<Package[]>;
  createPackage(pkg: InsertPackage): Promise<Package>;

  // Review operations
  getReviewsByHostel(hostelId: string): Promise<(Review & { username: string })[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateHostelRating(hostelId: string): Promise<void>;

  // Booking operations
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getBookingsByHostel(hostelId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined>;

  // Message operations
  getMessagesByUser(userId: string): Promise<(Message & { senderUsername: string, receiverUsername: string })[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Hostel operations
  async getHostels(filters?: { city?: string; location?: string; search?: string }): Promise<Hostel[]> {
    let query = db.select().from(hostels);
    
    const conditions = [];
    if (filters?.city) {
      conditions.push(eq(hostels.city, filters.city));
    }
    if (filters?.location) {
      conditions.push(eq(hostels.location, filters.location));
    }
    if (filters?.search) {
      conditions.push(
        or(
          ilike(hostels.name, `%${filters.search}%`),
          ilike(hostels.location, `%${filters.search}%`),
          ilike(hostels.description, `%${filters.search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    return await query.orderBy(desc(hostels.rating));
  }

  async getHostel(id: string): Promise<Hostel | undefined> {
    const result = await db.select().from(hostels).where(eq(hostels.id, id)).limit(1);
    return result[0];
  }

  async createHostel(hostel: InsertHostel): Promise<Hostel> {
    const result = await db.insert(hostels).values(hostel).returning();
    return result[0];
  }

  async updateHostel(id: string, updates: Partial<InsertHostel>): Promise<Hostel | undefined> {
    const result = await db.update(hostels).set(updates).where(eq(hostels.id, id)).returning();
    return result[0];
  }

  async deleteHostel(id: string): Promise<void> {
    await db.delete(hostels).where(eq(hostels.id, id));
  }

  // Room operations
  async getRoomsByHostel(hostelId: string): Promise<Room[]> {
    return await db.select().from(rooms).where(eq(rooms.hostelId, hostelId));
  }

  async createRoom(room: InsertRoom): Promise<Room> {
    const result = await db.insert(rooms).values(room).returning();
    return result[0];
  }

  async updateRoom(id: string, updates: Partial<InsertRoom>): Promise<Room | undefined> {
    const result = await db.update(rooms).set(updates).where(eq(rooms.id, id)).returning();
    return result[0];
  }

  // Package operations
  async getPackagesByHostel(hostelId: string): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.hostelId, hostelId));
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const result = await db.insert(packages).values(pkg).returning();
    return result[0];
  }

  // Review operations
  async getReviewsByHostel(hostelId: string): Promise<(Review & { username: string })[]> {
    const result = await db
      .select({
        id: reviews.id,
        hostelId: reviews.hostelId,
        userId: reviews.userId,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        username: users.username,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.hostelId, hostelId))
      .orderBy(desc(reviews.createdAt));
    
    return result;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(review).returning();
    await this.updateHostelRating(review.hostelId);
    return result[0];
  }

  async updateHostelRating(hostelId: string): Promise<void> {
    const reviewsList = await db.select().from(reviews).where(eq(reviews.hostelId, hostelId));
    
    if (reviewsList.length === 0) {
      await db.update(hostels)
        .set({ rating: '0.0', reviewCount: 0 })
        .where(eq(hostels.id, hostelId));
      return;
    }

    const avgRating = reviewsList.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviewsList.length;
    await db.update(hostels)
      .set({ 
        rating: avgRating.toFixed(1),
        reviewCount: reviewsList.length 
      })
      .where(eq(hostels.id, hostelId));
  }

  // Booking operations
  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingsByHostel(hostelId: string): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.hostelId, hostelId))
      .orderBy(desc(bookings.createdAt));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    const result = await db.update(bookings).set(updates).where(eq(bookings.id, id)).returning();
    return result[0];
  }

  // Message operations
  async getMessagesByUser(userId: string): Promise<(Message & { senderUsername: string, receiverUsername: string })[]> {
    const sender = users;
    const receiver = { ...users };

    const result = await db
      .select({
        id: messages.id,
        senderId: messages.senderId,
        receiverId: messages.receiverId,
        content: messages.content,
        unread: messages.unread,
        createdAt: messages.createdAt,
        senderUsername: sender.username,
        receiverUsername: sql<string>`receiver.username`,
      })
      .from(messages)
      .innerJoin(sender, eq(messages.senderId, sender.id))
      .innerJoin(sql`users AS receiver`, eq(messages.receiverId, sql`receiver.id`))
      .where(
        or(
          eq(messages.senderId, userId),
          eq(messages.receiverId, userId)
        )
      )
      .orderBy(desc(messages.createdAt));

    return result as any;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(message).returning();
    return result[0];
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db.update(messages).set({ unread: false }).where(eq(messages.id, id));
  }
}

export const storage = new DatabaseStorage();
