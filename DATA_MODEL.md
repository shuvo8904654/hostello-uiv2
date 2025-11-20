# Data Model Documentation

This document outlines the core data entities and their relationships within the Hostel Management System.

## 1. Core Entities

### User
Represents any person interacting with the system.
- **id**: Unique identifier (UUID)
- **name**: Full name
- **email**: Email address (unique)
- **phone**: Contact number
- **role**: `Tenant` | `Owner` | `Manager` | `Admin`
- **status**: `Verified` | `Pending` | `Suspended`
- **avatar**: URL to profile picture (optional)

### Hostel (Property)
A property listed on the platform.
- **id**: Unique identifier
- **ownerId**: Reference to User (Owner)
- **name**: Property name
- **city**: City location
- **location**: Specific area/neighborhood
- **address**: Full street address
- **description**: Marketing text
- **amenities**: List of available facilities (WiFi, AC, Gym, etc.)
- **images**: Array of image URLs
- **type**: `Mens` | `Womens` | `Co-ed`
- **status**: `Active` | `Draft` | `UnderMaintenance`
- **rating**: Aggregate review score (0-5)

### Room
A specific unit within a Hostel.
- **id**: Unique identifier
- **hostelId**: Reference to Hostel
- **name**: Room number or name (e.g., "304", "Blue Room")
- **type**: `Dorm` | `Private` | `Deluxe` | `Studio`
- **capacity**: Total number of beds
- **available**: Number of currently vacant beds
- **price**: Base monthly rent
- **features**: Room-specific amenities (Balcony, Attached Bath)

### Booking
A reservation made by a Tenant.
- **id**: Unique identifier
- **hostelId**: Reference to Hostel
- **roomId**: Reference to Room
- **userId**: Reference to User (Tenant)
- **checkIn**: Start date
- **checkOut**: End date
- **status**: `Pending` | `Confirmed` | `Active` | `Completed` | `Cancelled`
- **totalAmount**: Total cost of the stay
- **paymentStatus**: `Paid` | `Partial` | `Unpaid`

### Review
Feedback left by a Tenant for a Hostel.
- **id**: Unique identifier
- **hostelId**: Reference to Hostel
- **userId**: Reference to User
- **rating**: Score (1-5)
- **comment**: Text content
- **date**: Submission timestamp

### Message
Communication between users.
- **id**: Unique identifier
- **senderId**: Reference to User
- **receiverId**: Reference to User
- **content**: Message body
- **timestamp**: Time sent
- **read**: Boolean status

## 2. Financial Entities

### Transaction
Record of a financial payment.
- **id**: Unique identifier
- **bookingId**: Reference to Booking (optional)
- **payerId**: Reference to User
- **payeeId**: Reference to User (Owner/Platform)
- **amount**: Currency value
- **type**: `Rent` | `Deposit` | `ServiceFee` | `Refund`
- **date**: Transaction date
- **status**: `Success` | `Failed` | `Pending`

### Payroll
Staff salary records.
- **id**: Unique identifier
- **staffId**: Reference to User (Staff)
- **propertyId**: Reference to Hostel
- **amount**: Salary amount
- **month**: Payment period
- **status**: `Paid` | `Due`

## 3. Operational Entities

### MaintenanceRequest
Issues reported by tenants.
- **id**: Unique identifier
- **hostelId**: Reference to Hostel
- **roomId**: Reference to Room (optional)
- **requesterId**: Reference to User
- **description**: Details of the issue
- **priority**: `Low` | `Medium` | `High` | `Emergency`
- **status**: `Open` | `In Progress` | `Resolved`

### InventoryItem
Assets tracked by Owners/Managers.
- **id**: Unique identifier
- **hostelId**: Reference to Hostel
- **name**: Item name (e.g., "Mattress", "Chair")
- **quantity**: Count available
- **condition**: `New` | `Good` | `Fair` | `Poor`

## 4. Relationships

- **One Owner** has **Many Hostels**
- **One Hostel** has **Many Rooms**
- **One Room** has **Many Bookings** (over time)
- **One Tenant** can have **One Active Booking**
- **One Hostel** has **Many Reviews**
- **One Manager** can manage **One or Many Hostels**
