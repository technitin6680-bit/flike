import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '@/src/db/users';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TEMPORARY TEST - Firebase token verification bypass
    const decodedToken = {
      uid: 'test-user',
      email: 'test@example.com'
    };

    const user = await getOrCreateUser(
      decodedToken.uid,
      decodedToken.email
    );

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Auth sync error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}