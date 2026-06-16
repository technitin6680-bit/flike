import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db/index';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export interface AuthSession {
  token: any;
  dbUser: typeof users.$inferSelect;
}

export async function requireAuth(req: NextRequest): Promise<AuthSession | NextResponse> {
  try {
    const dbUserResults = await db
      .select()
      .from(users)
      .where(eq(users.uid, 'test-user'));

    if (!dbUserResults.length) {
      return NextResponse.json(
        { error: 'Test user not found in db' },
        { status: 401 }
      );
    }

    return {
      token: { uid: 'test-user' },
      dbUser: dbUserResults[0],
    };
  } catch (error) {
    console.error('Auth error', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}