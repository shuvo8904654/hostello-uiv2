# Database Schema Design (Drizzle ORM)

This document outlines the proposed database schema using Drizzle ORM. 
*Note: This is a design artifact. As a frontend-only prototype, these tables are not currently active in the backend.*

```typescript
import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// --- Users & Auth ---

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(), // Hashed
  fullName: text("full_name").notNull(),
  role: text("role", { enum: ["tenant", "owner", "manager", "admin"] }).default("tenant").notNull(),
  phone: text("phone"),
  avatarUrl: text("avatar_url"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// --- Properties (Hostels) ---

export const hostels = pgTable("hostels", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  location: text("location"), // Area/Neighborhood
  type: text("type", { enum: ["mens", "womens", "co-ed"] }).notNull(),
  amenities: jsonb("amenities").$type<string[]>(), // Array of strings
  images: jsonb("images").$type<string[]>(), // Array of URLs
  rating: decimal("rating").default("0"),
  status: text("status", { enum: ["active", "draft", "maintenance"] }).default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Rooms ---

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  hostelId: integer("hostel_id").references(() => hostels.id).notNull(),
  name: text("name").notNull(), // e.g., "Room 101"
  type: text("type", { enum: ["dorm", "private", "deluxe"] }).notNull(),
  capacity: integer("capacity").notNull(),
  price: integer("price").notNull(), // Monthly rent
  features: jsonb("features").$type<string[]>(),
  isAvailable: boolean("is_available").default(true),
});

// --- Bookings ---

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(), // Tenant
  hostelId: integer("hostel_id").references(() => hostels.id).notNull(),
  roomId: integer("room_id").references(() => rooms.id).notNull(),
  checkInDate: date("check_in_date").notNull(),
  checkOutDate: date("check_out_date").notNull(),
  status: text("status", { enum: ["pending", "confirmed", "active", "completed", "cancelled"] }).default("pending"),
  totalAmount: integer("total_amount").notNull(),
  paymentStatus: text("payment_status", { enum: ["paid", "unpaid", "partial"] }).default("unpaid"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Reviews ---

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  hostelId: integer("hostel_id").references(() => hostels.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Messages ---

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id).notNull(),
  receiverId: integer("receiver_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Relations (Drizzle) ---

export const usersRelations = relations(users, ({ many }) => ({
  hostels: many(hostels),
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const hostelsRelations = relations(hostels, ({ one, many }) => ({
  owner: one(users, {
    fields: [hostels.ownerId],
    references: [users.id],
  }),
  rooms: many(rooms),
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  hostel: one(hostels, {
    fields: [bookings.hostelId],
    references: [hostels.id],
  }),
  room: one(rooms, {
    fields: [bookings.roomId],
    references: [rooms.id],
  }),
}));
```
