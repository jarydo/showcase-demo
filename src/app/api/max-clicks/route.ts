import { NextResponse } from 'next/server';
import { getAblyRest, maxOutClicks, CHANNEL_NAME } from '@/lib/ably';

export async function POST() {
  try {
    const status = maxOutClicks();
    const ably = getAblyRest();
    
    // Publish the maxed out status to all connected clients
    await ably.channels.get(CHANNEL_NAME).publish('status-update', status);
    
    return NextResponse.json(status);
  } catch (error) {
    console.error('Max clicks error:', error);
    return NextResponse.json({ error: 'Failed to max clicks' }, { status: 500 });
  }
}