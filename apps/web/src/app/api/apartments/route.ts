import { NextResponse } from 'next/server';
import { prisma } from '@tourism/lib';

export async function GET() {
  try {
    const apartments = await prisma.apartment.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(apartments);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
