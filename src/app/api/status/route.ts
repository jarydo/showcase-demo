import { NextResponse } from 'next/server';
import { getStatus } from '@/lib/ably';

export async function GET() {
  try {
    const status = getStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}