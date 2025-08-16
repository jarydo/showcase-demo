import { NextResponse } from 'next/server';
import { getAblyRest, incrementClick, CHANNEL_NAME } from '@/lib/ably';

export const runtime = 'nodejs';
export const maxDuration = 10;

export async function POST() {
  try {
    console.log('Processing click request...');
    const status = await incrementClick();
    console.log('Increment completed:', status);
    
    const ably = getAblyRest();
    
    // Publish the updated status to all connected clients
    await ably.channels.get(CHANNEL_NAME).publish('status-update', status);
    console.log('Ably message published');
    
    return NextResponse.json(status);
  } catch (error) {
    console.error('Click error:', error);
    return NextResponse.json({ error: 'Failed to process click', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}