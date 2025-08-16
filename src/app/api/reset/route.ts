import { NextResponse } from 'next/server';
import { getAblyRest, resetClicks, CHANNEL_NAME } from '@/lib/ably';

export async function POST() {
  try {
    const status = await resetClicks();
    const ably = getAblyRest();
    
    // Publish the reset status to all connected clients
    await ably.channels.get(CHANNEL_NAME).publish('status-update', status);
    
    return NextResponse.json(status);
  } catch (error) {
    console.error('Reset error:', error);
    return NextResponse.json({ error: 'Failed to reset' }, { status: 500 });
  }
}