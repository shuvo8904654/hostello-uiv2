# Backend Implementation Reference

This document outlines all implemented backend features and provides guidance for future development.

## Database Schema

### Users Table
- `id` (varchar, UUID primary key)
- `username` (text, unique, required)
- `password` (text, bcrypt hashed, required)
- `email` (text, unique, required)
- `phone` (text, optional)
- `role` (text: 'tenant' | 'owner' | 'manager' | 'admin')
- `status` (text: 'pending' | 'verified')
- `createdAt` (timestamp)

### Hostels Table
- `id` (varchar, UUID primary key)
- `name` (text, required)
- `city` (text, required)
- `location` (text, required)
- `price` (integer, required)
- `rating` (decimal, auto-calculated from reviews)
- `reviewCount` (integer, auto-calculated)
- `image` (text, main image path)
- `images` (text array, gallery images)
- `amenities` (text array)
- `description` (text, required)
- `type` (text: 'Co-ed' | 'Mens' | 'Womens')
- `ownerId` (varchar, foreign key to users)
- `createdAt` (timestamp)

### Rooms Table
- `id` (varchar, UUID primary key)
- `hostelId` (varchar, foreign key to hostels, cascade delete)
- `name` (text, required)
- `price` (integer, required)
- `capacity` (integer, required)
- `type` (text: 'Dorm' | 'Private' | 'Deluxe')
- `available` (integer, number of available beds/rooms)

### Packages Table
- `id` (varchar, UUID primary key)
- `hostelId` (varchar, foreign key to hostels, cascade delete)
- `name` (text, required)
- `duration` (text, e.g., 'Monthly', '6 Months')
- `price` (integer, required)
- `features` (text array)

### Reviews Table
- `id` (varchar, UUID primary key)
- `hostelId` (varchar, foreign key to hostels, cascade delete)
- `userId` (varchar, foreign key to users)
- `rating` (integer, 1-5)
- `comment` (text, required)
- `createdAt` (timestamp)

### Bookings Table
- `id` (varchar, UUID primary key)
- `hostelId` (varchar, foreign key to hostels)
- `userId` (varchar, foreign key to users)
- `roomType` (text, required)
- `checkIn` (timestamp, required)
- `checkOut` (timestamp, required)
- `status` (text: 'pending' | 'active' | 'completed' | 'cancelled')
- `price` (integer, required)
- `createdAt` (timestamp)

### Messages Table
- `id` (varchar, UUID primary key)
- `senderId` (varchar, foreign key to users)
- `receiverId` (varchar, foreign key to users)
- `content` (text, required)
- `unread` (boolean, default true)
- `createdAt` (timestamp)

## API Endpoints

### Authentication Routes

#### POST /api/auth/register
- Body: `{ username, email, password, phone?, role? }`
- Returns: User object (without password)
- Auto-logs in user after registration

#### POST /api/auth/login
- Body: `{ username, password }`
- Returns: User object (without password)
- Sets session cookie

#### POST /api/auth/logout
- Requires: Authentication
- Returns: Success message
- Clears session

#### GET /api/auth/user
- Requires: Authentication
- Returns: Current user object (without password)

### Hostel Routes

#### GET /api/hostels
- Query params: `city`, `location`, `search` (all optional)
- Returns: Array of hostels (filtered and sorted by rating)
- Public access

#### GET /api/hostels/:id
- Returns: Hostel with rooms, packages, and reviews
- Public access

#### POST /api/hostels
- Requires: Authentication (Owner or Admin role)
- Body: Hostel data (ownerId auto-set from session)
- Returns: Created hostel

#### PATCH /api/hostels/:id
- Requires: Authentication + ownership or admin
- Body: Partial hostel data
- Returns: Updated hostel

#### DELETE /api/hostels/:id
- Requires: Authentication + ownership or admin
- Returns: Success message
- Cascades to rooms, packages, reviews

### Room Routes

#### POST /api/hostels/:hostelId/rooms
- Requires: Authentication
- Body: Room data (hostelId auto-set from URL)
- Returns: Created room

#### PATCH /api/rooms/:id
- Requires: Authentication
- Body: Partial room data
- Returns: Updated room

### Package Routes

#### POST /api/hostels/:hostelId/packages
- Requires: Authentication
- Body: Package data (hostelId auto-set from URL)
- Returns: Created package

### Review Routes

#### POST /api/hostels/:hostelId/reviews
- Requires: Authentication
- Body: `{ rating, comment }` (hostelId and userId auto-set)
- Returns: Created review
- Auto-updates hostel rating and reviewCount

### Booking Routes

#### GET /api/bookings
- Requires: Authentication
- Returns: Array of bookings for current user
- Sorted by creation date (newest first)

#### POST /api/bookings
- Requires: Authentication
- Body: `{ hostelId, roomType, checkIn, checkOut, price }` (userId auto-set)
- Returns: Created booking

#### PATCH /api/bookings/:id
- Requires: Authentication
- Body: Partial booking data (e.g., status update)
- Returns: Updated booking

### Message Routes

#### GET /api/messages
- Requires: Authentication
- Returns: Array of messages sent to or from current user
- Includes sender and receiver usernames

## Storage Interface (server/storage.ts)

All database operations go through the `IStorage` interface:

### User Operations
- `getUser(id)` - Get user by ID
- `getUserByUsername(username)` - Get user by username
- `getUserByEmail(email)` - Get user by email
- `createUser(user)` - Create new user
- `updateUser(id, updates)` - Update user

### Hostel Operations
- `getHostels(filters?)` - Get all hostels with optional filters
- `getHostel(id)` - Get single hostel
- `createHostel(hostel)` - Create hostel
- `updateHostel(id, updates)` - Update hostel
- `deleteHostel(id)` - Delete hostel (cascades)

### Room Operations
- `getRoomsByHostel(hostelId)` - Get all rooms for a hostel
- `createRoom(room)` - Create room
- `updateRoom(id, updates)` - Update room

### Package Operations
- `getPackagesByHostel(hostelId)` - Get all packages for a hostel
- `createPackage(package)` - Create package

### Review Operations
- `getReviewsByHostel(hostelId)` - Get all reviews for a hostel (with usernames)
- `createReview(review)` - Create review (auto-updates hostel rating)
- `updateHostelRating(hostelId)` - Recalculate average rating

### Booking Operations
- `getBookingsByUser(userId)` - Get user's bookings
- `getBookingsByHostel(hostelId)` - Get hostel's bookings
- `createBooking(booking)` - Create booking
- `updateBooking(id, updates)` - Update booking

### Message Operations
- `getMessagesByUser(userId)` - Get user's messages
- `createMessage(message)` - Create message
- `markMessageAsRead(id)` - Mark message as read

## Authentication System

Uses Passport.js with Local Strategy:
- Session-based authentication
- Bcrypt password hashing (10 rounds)
- Memory store for sessions (use Redis in production)
- 24-hour session expiry
- Secure cookies in production mode

## Seed Data

Run `tsx server/seed.ts` to populate database with:
- 5 users (tenants and owners)
- 4 hostels across different cities
- 6 rooms
- 5 packages
- 5 reviews
- 2 bookings
- 2 messages

Test credentials:
- Tenant: `rahim_ahmed` / `password123`
- Owner: `prime_properties` / `password123`

## Future Implementation Tasks

### High Priority
1. **Payment Integration**
   - Add payment gateway (Stripe/bKash)
   - Booking deposits and payment tracking
   - Refund system

2. **Image Upload**
   - Implement file upload for hostel images
   - Image optimization and storage
   - Multiple image upload support

3. **Real-time Messaging**
   - WebSocket implementation for live chat
   - Message notifications
   - Typing indicators

4. **Email Notifications**
   - Booking confirmations
   - Password reset
   - Account verification
   - Review notifications

### Medium Priority
5. **Advanced Search & Filters**
   - Price range filtering
   - Amenity-based filtering
   - Distance from university
   - Availability calendar

6. **Roommate Finder**
   - User profiles for tenants
   - Matching algorithm
   - Interest-based grouping

7. **Owner Dashboard Features**
   - Analytics and reports
   - Tenant management
   - Room availability management
   - Financial tracking

8. **Manager Dashboard**
   - Multi-property management
   - Staff assignments
   - Maintenance tracking

9. **Admin Dashboard**
   - User verification
   - Platform moderation
   - System analytics
   - Content management

### Low Priority
10. **Reviews Enhancement**
    - Review moderation
    - Reply to reviews
    - Helpful votes
    - Review images

11. **Booking Features**
    - Waitlist system
    - Booking modifications
    - Cancellation policies
    - Auto-confirmation

12. **Notifications System**
    - In-app notifications
    - Push notifications
    - Email preferences
    - SMS integration

## Database Migrations

**IMPORTANT**: Never manually write SQL migrations.

To apply schema changes:
1. Update `shared/schema.ts`
2. Run `npm run db:push` to sync changes
3. If data loss warning, use `npm run db:push --force`

## Security Considerations

### Implemented
- Password hashing with bcrypt
- Session-based authentication
- CSRF protection (via express-session)
- Input validation (Zod schemas)
- Role-based access control

### TODO
- Rate limiting
- API key rotation
- SQL injection prevention (use parameterized queries only)
- XSS prevention (sanitize user inputs)
- File upload validation
- Environment variable validation

## Performance Optimization

### TODO
- Database indexing (city, location, rating)
- Query optimization (N+1 prevention)
- Caching layer (Redis)
- Image CDN
- API response pagination
- Database connection pooling

## Testing

### TODO
- Unit tests for storage layer
- Integration tests for API routes
- E2E tests for critical user flows
- Load testing for high traffic scenarios

## Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure PostgreSQL production database
- [ ] Set up Redis for sessions (replace MemoryStore)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging
- [ ] Database backups
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key (change default!)
- `NODE_ENV` - 'development' or 'production'
- `PORT` - Server port (default: 5000)

Optional (for future features):
- `REDIS_URL` - Redis connection for sessions
- `SMTP_*` - Email service configuration
- `STRIPE_SECRET_KEY` - Payment processing
- `AWS_*` - File storage (S3)
- `CLOUDINARY_*` - Image hosting
