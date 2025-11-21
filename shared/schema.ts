import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: text("role").notNull().default('tenant'),
  status: text("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hostels = pgTable("hostels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  city: text("city").notNull(),
  location: text("location").notNull(),
  price: integer("price").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default('0.0'),
  reviewCount: integer("review_count").default(0),
  image: text("image").notNull(),
  images: text("images").array().default(sql`ARRAY[]::text[]`),
  amenities: text("amenities").array().default(sql`ARRAY[]::text[]`),
  description: text("description").notNull(),
  type: text("type").notNull(),
  ownerId: varchar("owner_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rooms = pgTable("rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hostelId: varchar("hostel_id").notNull().references(() => hostels.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  capacity: integer("capacity").notNull(),
  type: text("type").notNull(),
  available: integer("available").notNull(),
});

export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hostelId: varchar("hostel_id").notNull().references(() => hostels.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(),
  features: text("features").array().default(sql`ARRAY[]::text[]`),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hostelId: varchar("hostel_id").notNull().references(() => hostels.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hostelId: varchar("hostel_id").notNull().references(() => hostels.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  roomType: text("room_type").notNull(),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  status: text("status").notNull().default('pending'),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  receiverId: varchar("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  unread: boolean("unread").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertHostelSchema = createInsertSchema(hostels).omit({
  id: true,
  rating: true,
  reviewCount: true,
  createdAt: true,
});

export const insertRoomSchema = createInsertSchema(rooms).omit({
  id: true,
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertHostel = z.infer<typeof insertHostelSchema>;
export type Hostel = typeof hostels.$inferSelect;

export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type Room = typeof rooms.$inferSelect;

export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
