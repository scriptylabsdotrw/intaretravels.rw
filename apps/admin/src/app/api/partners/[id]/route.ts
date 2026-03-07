import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), '../../data/partners.json');

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const partners = JSON.parse(data);
    
    const index = partners.findIndex((p: any) => p.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }
    
    partners[index] = { ...partners[index], ...body };
    await fs.writeFile(DATA_PATH, JSON.stringify(partners, null, 2));
    
    return NextResponse.json(partners[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
