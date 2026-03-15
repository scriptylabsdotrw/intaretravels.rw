import { NextResponse } from 'next/server';
import { prisma } from '@tourism/lib';

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(tours);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
