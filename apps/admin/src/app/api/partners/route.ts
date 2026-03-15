import { NextResponse } from 'next/server';
import { prisma } from '@tourism/lib';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(partners);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const partner = await prisma.partner.create({ data: body });
    return NextResponse.json(partner);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
