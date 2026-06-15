import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { db } from '@/src/db/index';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export interface AuthSession {
  token: DecodedIdToken;
  dbUser: typeof users.$inferSelect;
}

export async function requireAuth(req: NextRequest): Promise<AuthSession | NextResponse> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
  }

  const tokenStr = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(tokenStr);
    
    // Fetch db user
    const dbUserResults = await db.select().from(users).where(eq(users.uid, decodedToken.uid));
    if (!dbUserResults.length) {
      return NextResponse.json({ error: 'User not found in db' }, { status: 401 });
    }

    return { token: decodedToken, dbUser: dbUserResults[0] };
  } catch (error) {
    console.error('Error verifying token', error);
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }
}
