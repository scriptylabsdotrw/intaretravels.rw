import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), '../../data/promotions.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const promotions = JSON.parse(data);
    
    const newPromotion = {
      ...body,
      id: Date.now().toString(),
    };
    
    promotions.push(newPromotion);
    await fs.writeFile(DATA_PATH, JSON.stringify(promotions, null, 2));
    
    return NextResponse.json(newPromotion);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 });
  }
}
