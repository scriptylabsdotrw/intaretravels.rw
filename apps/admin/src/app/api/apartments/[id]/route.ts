import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), '../../data/apartments.json');

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const apartments = JSON.parse(data);
    const filtered = apartments.filter((a: any) => a.id !== params.id);
    await fs.writeFile(DATA_PATH, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
