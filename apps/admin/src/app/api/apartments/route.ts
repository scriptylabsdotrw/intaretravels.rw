import { NextResponse } from 'next/server';
import { prisma } from '@tourism/lib';

export async function GET() {
  try {
    const apartments = await prisma.apartment.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(apartments);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch apartments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apartment = await prisma.apartment.create({ data: body });
    return NextResponse.json(apartment);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
