import heroImage from '@assets/generated_images/Modern_student_hostel_in_Dhaka_8b9032cc.png';
import exteriorImage from '@assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png';
import dormImage from '@assets/generated_images/Comfortable_shared_room_in_Dhaka_66667007.png';
import privateRoomImage from '@assets/generated_images/Stylish_private_student_room_1db365e3.png';

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface Hostel {
  id: string;
  name: string;
  city: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  reviewsList: Review[];
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  type: 'Co-ed' | 'Mens' | 'Womens';
  rooms: Room[];
  packages: Package[];
}

export interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  type: 'Dorm' | 'Private' | 'Deluxe';
  available: number;
}

export interface Package {
  name: string;
  duration: 'Daily' | 'Monthly' | 'Semester';
  price: number;
}

export const HOSTELS: Hostel[] = [
  {
    id: '1',
    name: 'Dhaka Student Hub',
    city: 'Dhaka',
    location: 'Bashundhara R/A',
    price: 5000,
    rating: 4.8,
    reviews: 124,
    reviewsList: [
      { id: 'r1', user: 'Tanvir Hasan', rating: 5, date: '2 days ago', comment: 'Amazing place! The WiFi is super fast and the study room is very quiet.', avatar: 'TH' },
      { id: 'r2', user: 'Sadia Rahman', rating: 4, date: '1 week ago', comment: 'Great security and clean environment. Just wish the kitchen was a bit bigger.', avatar: 'SR' },
      { id: 'r3', user: 'Karim Ullah', rating: 5, date: '2 weeks ago', comment: 'Best hostel in Bashundhara area for this price.', avatar: 'KU' },
    ],
    image: exteriorImage,
    images: [exteriorImage, dormImage, privateRoomImage, heroImage],
    amenities: ['High-speed WiFi', 'Gym', 'Study Room', 'Generator', '24/7 Security', 'CCTV'],
    description: 'The Hub offers a premium student living experience in the heart of Bashundhara. Close to NSU and IUB. With modern amenities and a vibrant community.',
    type: 'Mens',
    rooms: [
      { id: 'r1', name: '4-Bed AC Dorm', price: 5000, capacity: 4, type: 'Dorm', available: 2 },
      { id: 'r2', name: 'Private AC Room', price: 12000, capacity: 1, type: 'Private', available: 1 },
    ],
    packages: [
      { name: 'Monthly Stay', duration: 'Monthly', price: 5000 },
      { name: 'Semester Package', duration: 'Semester', price: 28000 },
    ]
  },
  {
    id: '2',
    name: 'Uttara Girls Hostel',
    city: 'Dhaka',
    location: 'Uttara Sector 4',
    price: 4500,
    rating: 4.5,
    reviews: 89,
    reviewsList: [
       { id: 'r4', user: 'Nusrat Jahan', rating: 5, date: '3 days ago', comment: 'Very safe for girls. The warden is very helpful.', avatar: 'NJ' },
       { id: 'r5', user: 'Farhana Akter', rating: 4, date: '2 weeks ago', comment: 'Good food and clean rooms.', avatar: 'FA' }
    ],
    image: dormImage,
    images: [dormImage, exteriorImage, heroImage],
    amenities: ['WiFi', 'Meal Service', 'Kitchen', 'Lounge', 'CCTV'],
    description: 'Safe and secure accommodation for female students in Uttara. Home-cooked meals available.',
    type: 'Womens',
    rooms: [
      { id: 'r3', name: '2-Bed Shared Room', price: 4500, capacity: 2, type: 'Dorm', available: 4 },
    ],
    packages: [
      { name: 'Monthly Stay', duration: 'Monthly', price: 4500 },
    ]
  },
  {
    id: '3',
    name: 'Chittagong Scholars Hall',
    city: 'Chittagong',
    location: 'Nasirabad',
    price: 3500,
    rating: 4.7,
    reviews: 45,
    reviewsList: [],
    image: privateRoomImage,
    images: [privateRoomImage, heroImage, exteriorImage],
    amenities: ['WiFi', 'Study Hall', 'Praying Room', 'Dining Hall'],
    description: 'Peaceful environment for serious students. Located near GEC circle.',
    type: 'Mens',
    rooms: [
      { id: 'r4', name: 'Single Room', price: 6000, capacity: 1, type: 'Private', available: 3 },
      { id: 'r5', name: '3-Bed Shared', price: 3500, capacity: 3, type: 'Dorm', available: 5 },
    ],
    packages: [
       { name: 'Monthly Stay', duration: 'Monthly', price: 3500 },
    ]
  },
  {
    id: '4',
    name: 'Sylhet Green View',
    city: 'Sylhet',
    location: 'Subid Bazar',
    price: 3000,
    rating: 4.6,
    reviews: 22,
    reviewsList: [],
    image: exteriorImage,
    images: [exteriorImage, dormImage],
    amenities: ['Garden', 'WiFi', 'IPS Backup', 'Attached Bath'],
    description: 'Eco-friendly hostel with open spaces and fresh air.',
    type: 'Co-ed',
    rooms: [
      { id: 'r6', name: 'Double Room', price: 5000, capacity: 2, type: 'Private', available: 1 },
    ],
    packages: [
      { name: 'Monthly Stay', duration: 'Monthly', price: 3000 },
    ]
  }
];

export const CITIES = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'];
export const LOCATIONS = ['Bashundhara R/A', 'Uttara', 'Dhanmondi', 'Mirpur', 'Mohammadpur', 'Banani', 'Gulshan'];
export const AMENITIES = ['WiFi', 'AC', 'Meal Service', 'Generator/IPS', 'Attached Bath', 'CCTV', 'Gym', 'Study Room'];

// New Mock Data for Dashboard

export const BOOKINGS = [
  { id: 'b1', hostelName: 'Dhaka Student Hub', roomType: 'Private AC Room', checkIn: '2025-09-01', checkOut: '2026-08-31', status: 'Active', price: 12000 },
  { id: 'b2', hostelName: 'Uttara Girls Hostel', roomType: '2-Bed Shared', checkIn: '2024-09-01', checkOut: '2025-06-30', status: 'Completed', price: 4500 },
];

export const MESSAGES = [
  { id: 'm1', sender: 'Manager (Dhaka Hub)', preview: 'Hi Rahim, rent for this month is due.', time: '10:30 AM', unread: true },
  { id: 'm2', sender: 'Karim (Roommate)', preview: 'Do you have the WiFi password?', time: 'Yesterday', unread: false },
  { id: 'm3', sender: 'Hostello Support', preview: 'Your booking request has been received.', time: '2 days ago', unread: false },
];

export const USERS = [
  { id: 'u1', name: 'Rahim Ahmed', role: 'Tenant', email: 'rahim@example.com', status: 'Verified', phone: '01711000000' },
  { id: 'u2', name: 'Fatima Begum', role: 'Owner', email: 'fatima@properties.com', status: 'Pending', phone: '01811000000' },
  { id: 'u3', name: 'Tanvir Hasan', role: 'Tenant', email: 'tanvir@example.com', status: 'Verified', phone: '01911000000' },
  { id: 'u4', name: 'Prime Properties', role: 'Owner', email: 'contact@prime.com', status: 'Verified', phone: '01611000000' },
];

export const TENANTS = [
  { id: 't1', name: 'Rahim Ahmed', room: '304', rentStatus: 'Paid', leaseEnd: '2026-08-31', phone: '01711000000' },
  { id: 't2', name: 'Sujon Khan', room: '305', rentStatus: 'Overdue', leaseEnd: '2026-08-31', phone: '01711000111' },
  { id: 't3', name: 'Nusrat Jahan', room: '306', rentStatus: 'Paid', leaseEnd: '2026-08-31', phone: '01711000222' },
];

export { heroImage, exteriorImage, dormImage, privateRoomImage };
