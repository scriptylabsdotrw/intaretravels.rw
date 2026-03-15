import { NextResponse } from 'next/server';
import { prisma } from '@tourism/lib';

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(tours);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tour = await prisma.tour.create({ data: body });
    return NextResponse.json(tour);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
