import heroImage from '@assets/generated_images/Modern_hostel_common_room_with_students_f10f3912.png';
import exteriorImage from '@assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png';
import dormImage from '@assets/generated_images/Clean_modern_hostel_dormitory_2b90dee0.png';
import privateRoomImage from '@assets/generated_images/Stylish_private_student_room_1db365e3.png';

export interface Hostel {
  id: string;
  name: string;
  city: string;
  university: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  type: 'Co-ed' | 'Mens' | 'Womens';
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  type: 'Dorm' | 'Private';
  available: number;
}

export const HOSTELS: Hostel[] = [
  {
    id: '1',
    name: 'The Hub Student Living',
    city: 'London',
    university: 'Imperial College',
    price: 250,
    rating: 4.8,
    reviews: 124,
    image: exteriorImage,
    images: [exteriorImage, dormImage, privateRoomImage, heroImage],
    amenities: ['High-speed WiFi', 'Gym', 'Study Room', 'Game Area', '24/7 Security'],
    description: 'The Hub offers a premium student living experience just minutes from campus. With modern amenities and a vibrant community, it is the perfect place to call home.',
    type: 'Co-ed',
    rooms: [
      { id: 'r1', name: '6-Bed Mixed Dorm', price: 250, capacity: 6, type: 'Dorm', available: 2 },
      { id: 'r2', name: 'Private Studio', price: 450, capacity: 1, type: 'Private', available: 1 },
    ]
  },
  {
    id: '2',
    name: 'Urban Nest',
    city: 'Manchester',
    university: 'University of Manchester',
    price: 180,
    rating: 4.5,
    reviews: 89,
    image: dormImage,
    images: [dormImage, exteriorImage, heroImage],
    amenities: ['WiFi', 'Laundry', 'Kitchen', 'Lounge'],
    description: 'Affordable and comfortable student accommodation in the heart of Manchester. Perfect for social students looking to make new friends.',
    type: 'Co-ed',
    rooms: [
      { id: 'r3', name: '4-Bed Dorm', price: 180, capacity: 4, type: 'Dorm', available: 4 },
    ]
  },
  {
    id: '3',
    name: 'Prestige Hall',
    city: 'London',
    university: 'UCL',
    price: 300,
    rating: 4.9,
    reviews: 210,
    image: privateRoomImage,
    images: [privateRoomImage, heroImage, exteriorImage],
    amenities: ['Ensuite Bathrooms', 'Cinema Room', 'Rooftop Terrace', 'Concierge'],
    description: 'Luxury student living for those who want the best. Enjoy hotel-style amenities and privacy in our exclusive residence.',
    type: 'Co-ed',
    rooms: [
      { id: 'r4', name: 'Deluxe Studio', price: 300, capacity: 1, type: 'Private', available: 0 },
    ]
  },
  {
    id: '4',
    name: 'Greenwood Res',
    city: 'Bristol',
    university: 'University of Bristol',
    price: 200,
    rating: 4.6,
    reviews: 56,
    image: exteriorImage, // Reuse for prototype
    images: [exteriorImage, dormImage],
    amenities: ['Garden', 'Bike Storage', 'Eco-friendly', 'Quiet Study'],
    description: 'A peaceful and eco-friendly environment for students who prefer a quieter atmosphere.',
    type: 'Co-ed',
    rooms: [
      { id: 'r5', name: 'Single Room', price: 200, capacity: 1, type: 'Private', available: 3 },
    ]
  }
];

export const CITIES = ['London', 'Manchester', 'Bristol', 'Edinburgh', 'Leeds'];
export const UNIVERSITIES = ['Imperial College', 'UCL', 'University of Manchester', 'University of Bristol', 'LSE'];
export const AMENITIES = ['WiFi', 'Gym', 'Laundry', 'Kitchen', 'AC', 'Security'];

// New Mock Data

export const BOOKINGS = [
  { id: 'b1', hostelName: 'The Hub Student Living', roomType: 'Private Studio', checkIn: '2025-09-01', checkOut: '2026-08-31', status: 'Active', price: 450 },
  { id: 'b2', hostelName: 'Urban Nest', roomType: '4-Bed Dorm', checkIn: '2024-09-01', checkOut: '2025-06-30', status: 'Completed', price: 180 },
];

export const MESSAGES = [
  { id: 'm1', sender: 'The Hub Manager', preview: 'Hi Alex, just confirming your move-in date.', time: '10:30 AM', unread: true },
  { id: 'm2', sender: 'Sarah (Roommate)', preview: 'Hey! Do you know if we need to bring our own...', time: 'Yesterday', unread: false },
  { id: 'm3', sender: 'Hostello Support', preview: 'Your booking request has been received.', time: '2 days ago', unread: false },
];

export const USERS = [
  { id: 'u1', name: 'Alex Johnson', role: 'Tenant', email: 'alex@example.com', status: 'Verified' },
  { id: 'u2', name: 'Maria Garcia', role: 'Owner', email: 'maria@properties.com', status: 'Pending' },
  { id: 'u3', name: 'John Smith', role: 'Tenant', email: 'john@example.com', status: 'Verified' },
  { id: 'u4', name: 'Luxury Living Ltd', role: 'Owner', email: 'contact@luxuryliving.com', status: 'Verified' },
];

export const TENANTS = [
  { id: 't1', name: 'Alex Johnson', room: '304', rentStatus: 'Paid', leaseEnd: '2026-08-31', phone: '+44 7700 900077' },
  { id: 't2', name: 'David Chen', room: '305', rentStatus: 'Overdue', leaseEnd: '2026-08-31', phone: '+44 7700 900123' },
  { id: 't3', name: 'Sarah Williams', room: '306', rentStatus: 'Paid', leaseEnd: '2026-08-31', phone: '+44 7700 900456' },
];

export { heroImage, exteriorImage, dormImage, privateRoomImage };
