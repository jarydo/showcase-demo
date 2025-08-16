import { NextResponse } from 'next/server';
import { getAblyRest, incrementClick, CHANNEL_NAME } from '@/lib/ably';

export async function POST() {
  try {
    const status = await incrementClick();
    const ably = getAblyRest();
    
    // Publish the updated status to all connected clients
    await ably.channels.get(CHANNEL_NAME).publish('status-update', status);
    
    return NextResponse.json(status);
  } catch (error) {
    console.error('Click error:', error);
    return NextResponse.json({ error: 'Failed to process click' }, { status: 500 });
  }
}