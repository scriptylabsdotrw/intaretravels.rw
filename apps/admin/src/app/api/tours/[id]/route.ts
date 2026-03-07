import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), '../../data/tours.json');

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const tours = JSON.parse(data);
    
    const index = tours.findIndex((t: any) => t.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }
    
    tours[index] = { ...tours[index], ...body };
    await fs.writeFile(DATA_PATH, JSON.stringify(tours, null, 2));
    
    return NextResponse.json(tours[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tour' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const tours = JSON.parse(data);
    
    const filtered = tours.filter((t: any) => t.id !== params.id);
    await fs.writeFile(DATA_PATH, JSON.stringify(filtered, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tour' }, { status: 500 });
  }
}
