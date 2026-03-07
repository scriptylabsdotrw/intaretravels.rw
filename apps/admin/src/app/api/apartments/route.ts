import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), '../../data/apartments.json');

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
    const apartments = JSON.parse(data);
    
    const newApartment = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    apartments.push(newApartment);
    await fs.writeFile(DATA_PATH, JSON.stringify(apartments, null, 2));
    
    return NextResponse.json(newApartment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create apartment' }, { status: 500 });
  }
}
