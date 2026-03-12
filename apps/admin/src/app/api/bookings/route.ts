import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), '../../data/bookings.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    
    // Map the data to match frontend expectations
    const mappedBookings = bookings.map((booking: any) => {
      const mapped: any = {
        id: booking.id,
        type: booking.type,
        name: booking.customerName,
        email: booking.customerEmail,
        phone: booking.customerPhone,
        status: booking.status,
        createdAt: booking.createdAt,
        message: booking.notes,
      };

      // Add type-specific fields
      if (booking.type === 'tour') {
        mapped.itemName = booking.tourName;
        mapped.startDate = booking.startDate;
        mapped.participants = booking.participants;
      } else if (booking.type === 'flight') {
        mapped.itemName = `Flight to ${booking.flightDetails.destination}`;
        mapped.departure = booking.flightDetails.departureDate;
        mapped.returnDate = booking.flightDetails.returnDate;
        mapped.passengers = booking.flightDetails.passengers;
      } else if (booking.type === 'apartment') {
        mapped.itemName = booking.apartmentName;
        mapped.startDate = booking.checkIn;
        mapped.participants = booking.guests;
      }

      return mapped;
    });
    
    // Sort by date, newest first
    mappedBookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(mappedBookings);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    
    const newBooking = {
      ...body,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    bookings.push(newBooking);
    await fs.writeFile(DATA_PATH, JSON.stringify(bookings, null, 2));
    
    return NextResponse.json(newBooking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
