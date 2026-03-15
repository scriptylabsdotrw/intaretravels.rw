import { PrismaClient } from '@prisma/client';
import toursData from '../data/tours.json';
import apartmentsData from '../data/apartments.json';
import promotionsData from '../data/promotions.json';
import partnersData from '../data/partners.json';
import bookingsData from '../data/bookings.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.apartment.deleteMany();
  await prisma.tour.deleteMany();

  // Seed Tours
  for (const tour of toursData as any[]) {
    await prisma.tour.create({
      data: {
        id: tour.id,
        slug: tour.slug,
        name: tour.name,
        description: tour.description,
        price: tour.price,
        currency: tour.currency || 'USD',
        duration: tour.duration,
        image: tour.image,
        highlights: tour.highlights || [],
        included: tour.included || [],
        itinerary: tour.itinerary || [],
        featured: tour.featured || false,
        seoTitle: tour.seoTitle || null,
        seoDescription: tour.seoDescription || null,
      },
    });
  }
  console.log(`✅ Seeded ${toursData.length} tours`);

  // Seed Apartments
  for (const apt of apartmentsData as any[]) {
    await prisma.apartment.create({
      data: {
        id: apt.id,
        slug: apt.slug,
        name: apt.name,
        description: apt.description,
        pricePerNight: apt.pricePerNight,
        currency: apt.currency || 'USD',
        bedrooms: apt.bedrooms,
        bathrooms: apt.bathrooms,
        maxGuests: apt.maxGuests,
        image: apt.image,
        amenities: apt.amenities || [],
        address: apt.address,
        featured: apt.featured || false,
        seoTitle: apt.seoTitle || null,
        seoDescription: apt.seoDescription || null,
      },
    });
  }
  console.log(`✅ Seeded ${apartmentsData.length} apartments`);

  // Seed Promotions
  for (const promo of promotionsData as any[]) {
    await prisma.promotion.create({
      data: {
        id: promo.id,
        destination: promo.destination,
        from: promo.from || 'Kigali',
        price: promo.price,
        discount: promo.discount,
        airline: promo.airline,
        logo: promo.logo || '',
        image: promo.image || '',
        validUntil: promo.validUntil,
        active: promo.active ?? true,
      },
    });
  }
  console.log(`✅ Seeded ${promotionsData.length} promotions`);

  // Seed Partners
  for (const partner of partnersData as any[]) {
    await prisma.partner.create({
      data: {
        id: partner.id,
        name: partner.name,
        logo: partner.logo || '',
        description: partner.description || '',
        active: partner.active ?? true,
      },
    });
  }
  console.log(`✅ Seeded ${partnersData.length} partners`);

  // Seed Bookings
  for (const booking of bookingsData as any[]) {
    await prisma.booking.create({
      data: {
        id: booking.id,
        type: booking.type,
        name: booking.customerName || booking.name,
        email: booking.customerEmail || booking.email,
        phone: booking.customerPhone || booking.phone,
        itemName: booking.tourName || booking.apartmentName || `Flight to ${booking.flightDetails?.destination}` || booking.itemName || '',
        startDate: booking.startDate || booking.checkIn || null,
        endDate: booking.endDate || booking.checkOut || null,
        participants: booking.participants || booking.guests || null,
        departure: booking.flightDetails?.departureDate || null,
        returnDate: booking.flightDetails?.returnDate || null,
        passengers: booking.flightDetails?.passengers || null,
        amount: booking.totalAmount || booking.amount || null,
        status: booking.status || 'pending',
        message: booking.notes || booking.message || null,
      },
    });
  }
  console.log(`✅ Seeded ${bookingsData.length} bookings`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
