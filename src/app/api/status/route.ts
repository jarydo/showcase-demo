import { NextResponse } from 'next/server';
import { getStatus } from '@/lib/ably';

export const runtime = 'nodejs';
export const maxDuration = 10;

export async function GET() {
  try {
    const status = await getStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}