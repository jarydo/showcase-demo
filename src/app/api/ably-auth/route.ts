import { NextResponse } from 'next/server';
import { getAblyRest } from '@/lib/ably';

export const runtime = 'nodejs';
export const maxDuration = 10;

export async function GET() {
  try {
    const ably = getAblyRest();
    
    // Create a token for the client
    const tokenRequest = await ably.auth.createTokenRequest({
      capability: {
        'mosaic-demo': ['subscribe'],
      },
    });
    
    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}