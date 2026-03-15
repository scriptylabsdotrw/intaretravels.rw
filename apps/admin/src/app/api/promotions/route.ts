import { NextResponse } from 'next/server';
import { prisma } from '@tourism/lib';

export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(promotions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const promotion = await prisma.promotion.create({ data: body });
    return NextResponse.json(promotion);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
