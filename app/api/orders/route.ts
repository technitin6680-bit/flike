import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-server';
import { db } from '@/src/db/index';
import { orders } from '@/src/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const authSession = await requireAuth(req);
    if (authSession instanceof NextResponse) return authSession;

    const body = await req.json();
    
    // Validate request
    if (!body.websiteType || !body.websiteName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newOrder = await db.insert(orders).values({
      userId: authSession.dbUser.id,
      websiteType: body.websiteType,
      websiteName: body.websiteName,
      businessName: body.businessName,
      description: body.description,
      requiredFeatures: body.requiredFeatures || [],
      domainOption: body.domainOption,
      mobileNumber: body.mobileNumber,
      emailAddress: body.emailAddress,
      totalEstimatedCost: body.totalEstimatedCost,
    }).returning();

    return NextResponse.json({ success: true, order: newOrder[0] });

  } catch (error) {
    console.error('Error creating order', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authSession = await requireAuth(req);
    if (authSession instanceof NextResponse) return authSession;

    let ordersList;

    if (authSession.dbUser.role === 'admin') {
      ordersList = await db.select().from(orders).orderBy(desc(orders.createdAt));
    } else {
      ordersList = await db.select()
        .from(orders)
        .where(eq(orders.userId, authSession.dbUser.id))
        .orderBy(desc(orders.createdAt));
    }

    return NextResponse.json({ success: true, orders: ordersList });

  } catch (error) {
    console.error('Error fetching orders', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
