import { db } from './db';
import { users, hostels, rooms, packages, reviews, bookings, messages } from '@shared/schema';
import { hash } from 'bcryptjs';

// Seed data for initial database population
export async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    // Create sample users
    const hashedPassword = await hash('password123', 10);
    
    const [tenant1] = await db.insert(users).values({
      username: 'rahim_ahmed',
      email: 'rahim@example.com',
      password: hashedPassword,
      phone: '01711000000',
      role: 'tenant',
      status: 'verified',
    }).returning();

    const [tenant2] = await db.insert(users).values({
      username: 'tanvir_hasan',
      email: 'tanvir@example.com',
      password: hashedPassword,
      phone: '01911000000',
      role: 'tenant',
      status: 'verified',
    }).returning();

    const [tenant3] = await db.insert(users).values({
      username: 'nusrat_jahan',
      email: 'nusrat@example.com',
      password: hashedPassword,
      phone: '01711000222',
      role: 'tenant',
      status: 'verified',
    }).returning();

    const [owner1] = await db.insert(users).values({
      username: 'prime_properties',
      email: 'contact@prime.com',
      password: hashedPassword,
      phone: '01611000000',
      role: 'owner',
      status: 'verified',
    }).returning();

    const [owner2] = await db.insert(users).values({
      username: 'fatima_begum',
      email: 'fatima@properties.com',
      password: hashedPassword,
      phone: '01811000000',
      role: 'owner',
      status: 'verified',
    }).returning();

    console.log('✓ Created users');

    // Create hostels with real image paths
    const [hostel1] = await db.insert(hostels).values({
      name: 'Dhaka Student & Pro Hub',
      city: 'Dhaka',
      location: 'Bashundhara R/A',
      price: 5000,
      rating: '4.8',
      reviewCount: 3,
      image: '/assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png',
      images: [
        '/assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png',
        '/assets/generated_images/Comfortable_shared_room_in_Dhaka_66667007.png',
        '/assets/generated_images/Stylish_private_student_room_1db365e3.png',
        '/assets/generated_images/Modern_student_hostel_in_Dhaka_8b9032cc.png'
      ],
      amenities: ['High-speed WiFi', 'Gym', 'Study/Work Lounge', 'Generator', '24/7 Security', 'CCTV'],
      description: 'The Hub offers a premium living experience for students and young professionals in Bashundhara. Close to NSU, IUB, and major offices.',
      type: 'Mens',
      ownerId: owner1.id,
    }).returning();

    const [hostel2] = await db.insert(hostels).values({
      name: 'Uttara Ladies Residence',
      city: 'Dhaka',
      location: 'Uttara Sector 4',
      price: 4500,
      rating: '4.5',
      reviewCount: 2,
      image: '/assets/generated_images/Comfortable_shared_room_in_Dhaka_66667007.png',
      images: [
        '/assets/generated_images/Comfortable_shared_room_in_Dhaka_66667007.png',
        '/assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png',
        '/assets/generated_images/Modern_student_hostel_in_Dhaka_8b9032cc.png'
      ],
      amenities: ['WiFi', 'Meal Service', 'Kitchen', 'Lounge', 'CCTV'],
      description: 'Safe and secure accommodation for female students and professionals in Uttara. Home-cooked meals available.',
      type: 'Womens',
      ownerId: owner2.id,
    }).returning();

    const [hostel3] = await db.insert(hostels).values({
      name: 'Chittagong Scholars Hall',
      city: 'Chittagong',
      location: 'Nasirabad',
      price: 3500,
      rating: '4.7',
      reviewCount: 0,
      image: '/assets/generated_images/Stylish_private_student_room_1db365e3.png',
      images: [
        '/assets/generated_images/Stylish_private_student_room_1db365e3.png',
        '/assets/generated_images/Modern_student_hostel_in_Dhaka_8b9032cc.png',
        '/assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png'
      ],
      amenities: ['WiFi', 'Study Hall', 'Praying Room', 'Dining Hall'],
      description: 'Peaceful environment for serious students and professionals. Located near GEC circle.',
      type: 'Mens',
      ownerId: owner1.id,
    }).returning();

    const [hostel4] = await db.insert(hostels).values({
      name: 'Sylhet Green View',
      city: 'Sylhet',
      location: 'Subid Bazar',
      price: 3000,
      rating: '4.6',
      reviewCount: 0,
      image: '/assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png',
      images: [
        '/assets/generated_images/Modern_student_accommodation_exterior_26c726a4.png',
        '/assets/generated_images/Comfortable_shared_room_in_Dhaka_66667007.png'
      ],
      amenities: ['Garden', 'WiFi', 'IPS Backup', 'Attached Bath'],
      description: 'Eco-friendly hostel with open spaces. Ideal for students seeking a quiet place.',
      type: 'Co-ed',
      ownerId: owner2.id,
    }).returning();

    console.log('✓ Created hostels');

    // Create rooms for each hostel
    await db.insert(rooms).values([
      { hostelId: hostel1.id, name: '4-Bed Student Dorm', price: 5000, capacity: 4, type: 'Dorm', available: 2 },
      { hostelId: hostel1.id, name: 'Private AC Room', price: 12000, capacity: 1, type: 'Private', available: 1 },
      { hostelId: hostel2.id, name: '2-Bed Shared Room', price: 4500, capacity: 2, type: 'Dorm', available: 4 },
      { hostelId: hostel3.id, name: 'Single Room', price: 6000, capacity: 1, type: 'Private', available: 3 },
      { hostelId: hostel3.id, name: '3-Bed Shared', price: 3500, capacity: 3, type: 'Dorm', available: 5 },
      { hostelId: hostel4.id, name: 'Double Room', price: 5000, capacity: 2, type: 'Private', available: 1 },
    ]);

    console.log('✓ Created rooms');

    // Create packages
    await db.insert(packages).values([
      {
        hostelId: hostel1.id,
        name: 'Monthly Stay',
        duration: 'Monthly',
        price: 5000,
        features: ['WiFi Included', 'Weekly Cleaning', 'Shared Kitchen Access'],
      },
      {
        hostelId: hostel1.id,
        name: 'Semester Saver',
        duration: '6 Months',
        price: 28000,
        features: ['10% Discount', 'Priority Support', 'Fixed Room Rate', 'Gym Access'],
      },
      {
        hostelId: hostel2.id,
        name: 'Monthly Stay',
        duration: 'Monthly',
        price: 4500,
        features: ['3 Meals/Day', 'WiFi', 'Laundry Service'],
      },
      {
        hostelId: hostel3.id,
        name: 'Monthly Stay',
        duration: 'Monthly',
        price: 3500,
        features: ['WiFi', 'Study Hall Access'],
      },
      {
        hostelId: hostel4.id,
        name: 'Monthly Stay',
        duration: 'Monthly',
        price: 3000,
        features: ['Garden Access', 'Weekly Cleaning'],
      },
    ]);

    console.log('✓ Created packages');

    // Create reviews
    await db.insert(reviews).values([
      {
        hostelId: hostel1.id,
        userId: tenant1.id,
        rating: 5,
        comment: 'Perfect for students! The study room is quiet and WiFi is fast for freelancers too.',
      },
      {
        hostelId: hostel1.id,
        userId: tenant2.id,
        rating: 4,
        comment: 'Great security and clean environment. Good for university students.',
      },
      {
        hostelId: hostel1.id,
        userId: tenant3.id,
        rating: 5,
        comment: 'Best hostel in Bashundhara area for this price.',
      },
      {
        hostelId: hostel2.id,
        userId: tenant3.id,
        rating: 5,
        comment: 'Very safe for female students and job holders. The manager is helpful.',
      },
      {
        hostelId: hostel2.id,
        userId: tenant1.id,
        rating: 4,
        comment: 'Good food and clean rooms.',
      },
    ]);

    console.log('✓ Created reviews');

    // Create sample bookings
    await db.insert(bookings).values([
      {
        hostelId: hostel1.id,
        userId: tenant1.id,
        roomType: 'Private AC Room',
        checkIn: new Date('2025-09-01'),
        checkOut: new Date('2026-08-31'),
        status: 'active',
        price: 12000,
      },
      {
        hostelId: hostel2.id,
        userId: tenant3.id,
        roomType: '2-Bed Shared',
        checkIn: new Date('2024-09-01'),
        checkOut: new Date('2025-06-30'),
        status: 'completed',
        price: 4500,
      },
    ]);

    console.log('✓ Created bookings');

    // Create sample messages
    await db.insert(messages).values([
      {
        senderId: owner1.id,
        receiverId: tenant1.id,
        content: 'Hi Rahim, rent for this month is due.',
        unread: true,
      },
      {
        senderId: tenant2.id,
        receiverId: tenant1.id,
        content: 'Do you have the WiFi password?',
        unread: false,
      },
    ]);

    console.log('✓ Created messages');

    console.log('✅ Database seeded successfully!');
    console.log('\nTest credentials:');
    console.log('Username: rahim_ahmed / Password: password123 (Tenant)');
    console.log('Username: prime_properties / Password: password123 (Owner)');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('Seed completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}
