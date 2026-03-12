import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), '../../data/bookings.json');

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    
    const index = bookings.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    bookings[index] = { ...bookings[index], ...body };
    await fs.writeFile(DATA_PATH, JSON.stringify(bookings, null, 2));
    
    return NextResponse.json(bookings[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    
    const filtered = bookings.filter((b: any) => b.id !== id);
    await fs.writeFile(DATA_PATH, JSON.stringify(filtered, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
