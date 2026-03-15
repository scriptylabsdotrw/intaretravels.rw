import { NextResponse } from 'next/server';
import { prisma } from '@tourism/lib';

export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(promotions);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
