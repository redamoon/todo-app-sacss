import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    return NextResponse.json({ message: 'Access token cookie has been deleted.' });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: 'A server error has occurred.' },
      { status: 500 }
    );
  }
}