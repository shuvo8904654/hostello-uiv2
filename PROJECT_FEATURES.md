# Project Features Documentation

This document provides a comprehensive overview of all features currently implemented in the Hostel Management System project.

## 1. Public / Guest Features
Features available to unregistered users or potential customers.

- **Home Page**: Landing page with search functionality and featured hostels.
- **Search & Discovery**:
  - Search hostels by location, price, and amenities.
  - Advanced filtering options.
- **Hostel Comparison**: Tool to compare multiple hostels side-by-side (`/compare`).
- **Hostel Details**:
  - Detailed view of individual hostels.
  - Image galleries, amenity lists, and room types.
- **Owner Onboarding**: Dedicated landing page for property owners ("List your property").
- **Authentication**: User registration and sign-up flows.

## 2. Tenant Portal
Features for residents and students living in the hostels.

- **Dashboard**: Overview of current stay, upcoming payments, and notifications.
- **Booking Management**: View current and past bookings.
- **Roommate Finder**: Feature to find and match with potential roommates.
- **Messages**: Communication system with management or owners.
- **Settings**: Personal profile and account settings.

## 3. Owner Portal
Comprehensive suite for property owners to manage their business.

- **Dashboard**: Business overview, occupancy rates, and key metrics.
- **Property Management**:
  - View all listed properties.
  - **Add/Edit Property**: Detailed form for listing new hostels (`/dashboard/owner/properties/new`).
- **Booking Management**: Oversight of all guest bookings and reservations.
- **Tenant Management**: Directory of current residents and their details.
- **Financials & Operations**:
  - **Financials Dashboard**: Revenue tracking and expense management.
  - **Payouts**: Manage withdrawal methods and history.
  - **Payroll**: Staff salary management and processing.
  - **Salaries**: Detailed salary breakdowns.
- **Staff Management**: Hire and manage hostel staff members.
- **Maintenance**: Track and resolve maintenance requests from tenants.
- **Marketing**: Tools to promote properties and manage campaigns.
- **Website Builder**: Tool for owners to create custom pages for their hostels.
- **Pricing & Packages**: Manage room rates and special packages.
- **Inventory & Food**:
  - **Inventory**: Track furniture, linens, and supplies.
  - **Food**: Manage mess/canteen menus and supplies.
- **Reviews**: Monitor and respond to tenant reviews.
- **Messages**: Inbox for communicating with tenants and staff.
- **Settings**: Account and business configuration.

## 4. Manager Portal
Tools for day-to-day hostel managers (staff level).

- **Dashboard**: Operational overview for daily tasks.
- **Booking Operations**: Check-ins, check-outs, and reservation handling.
- **Tenant Support**: Access to tenant details for support purposes.
- **Room Management**: Manage room availability and status.
- **Maintenance Handling**: View and update status of maintenance tickets.
- **Financial Reporting**: View financial reports relevant to management.
- **Analytics**: Detailed charts and data on hostel performance.
- **Marketing**: Execute marketing strategies.
- **Staff Oversight**: View staff schedules and details.
- **Reviews**: View feedback.
- **Messages**: Communication channel.

## 5. Admin Portal
Super-admin tools for platform operators.

- **Dashboard**: Global platform health and statistics.
- **User Management**: Manage all users (Tenants, Owners, Managers).
- **Verification**: Identity verification workflows for owners/users.
- **Platform Control**: System-wide settings and configuration.
- **Moderation**: Content moderation tools.
- **Bookings Oversight**: Global view of booking activity.
- **Billing**: Platform subscription and billing management.
- **Support**: Help desk and support ticket management.
- **System Health**: Technical monitoring.
- **Data Management**: Database and record oversight.

## 6. Technical & UI Features

- **UI Component Library**:
  - Built with **Radix UI** primitives for accessibility.
  - **Shadcn/UI** styled components.
  - Comprehensive set: Accordions, Dialogs, Sheets, Cards, Menus, Toasts, etc.
- **Data Visualization**: Charts and graphs using **Recharts**.
- **Form Handling**: Robust forms using **React Hook Form** and **Zod** validation.
- **Theming**: Dark/Light mode support (via `next-themes`).
- **Animations**: Smooth interactions using **Framer Motion** and **Tailwind Animate**.
- **Routing**: Client-side routing with **Wouter**.
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
