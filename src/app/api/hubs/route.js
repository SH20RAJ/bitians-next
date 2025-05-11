import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hubs, hubMembers, users } from '@/lib/db/schema';
import { desc, eq, sql, and } from 'drizzle-orm';
import { getSession } from '@/lib/auth/session';

export const runtime = 'edge';

// GET /api/hubs - Get all hubs with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get hubs with creator info and member count
    const hubsData = await db.query.hubs.findMany({
      orderBy: [desc(hubs.createdAt)],
      limit,
      offset,
      with: {
        createdBy: true,
        members: {
          limit: 5,
          with: {
            user: true,
          },
        },
      },
    });

    // Get session to check if user is a member of each hub
    const session = await getSession();
    const currentUserId = session?.user?.id;

    // Transform the data to include member count and check if user is a member
    const transformedHubs = await Promise.all(hubsData.map(async (hub) => {
      // Get total member count
      const memberCountResult = await db
        .select({ count: sql`count(*)` })
        .from(hubMembers)
        .where(eq(hubMembers.hubId, hub.id));

      const memberCount = memberCountResult[0].count;

      // Check if current user is a member
      let isMember = false;
      let userRole = null;

      if (currentUserId) {
        const memberRecord = await db
          .select()
          .from(hubMembers)
          .where(
            and(
              eq(hubMembers.hubId, hub.id),
              eq(hubMembers.userId, currentUserId)
            )
          )
          .limit(1);

        if (memberRecord.length > 0) {
          isMember = true;
          userRole = memberRecord[0].role;
        }
      }

      // Return a transformed hub object (not a Response)
      return {
        id: hub.id,
        name: hub.name,
        description: hub.description,
        image: hub.image,
        coverImage: hub.coverImage,
        isVerified: hub.isVerified,
        createdAt: hub.createdAt,
        createdBy: {
          id: hub.createdBy.id,
          name: hub.createdBy.name,
          username: hub.createdBy.username,
          image: hub.createdBy.image,
        },
        memberCount,
        isMember,
        userRole,
        recentMembers: hub.members.map(membership => ({
          id: membership.user.id,
          name: membership.user.name,
          username: membership.user.username,
          image: membership.user.image,
          role: membership.role,
        })),
      };
    }));

    // Get total count for pagination
    const totalCountResult = await db.select({ count: sql`count(*)` }).from(hubs);
    const totalCount = totalCountResult[0].count;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      hubs: transformedHubs,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching hubs:', error);
    return NextResponse.json({ error: 'Failed to fetch hubs' }, { status: 500 });
  }
}

// POST /api/hubs - Create a new hub (protected)
export async function POST(request) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();

    // Validate request body
    if (!body.name) {
      return NextResponse.json({ error: 'Hub name is required' }, { status: 400 });
    }

    // Create hub
    const hubId = crypto.randomUUID();
    await db.insert(hubs).values({
      id: hubId,
      name: body.name,
      description: body.description || null,
      createdById: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: body.image || null,
      coverImage: body.coverImage || null,
      isVerified: false,
    });

    // Add creator as admin member
    await db.insert(hubMembers).values({
      hubId,
      userId,
      role: 'admin',
      joinedAt: new Date(),
    });

    // Fetch the created hub with creator info
    const createdHub = await db.query.hubs.findFirst({
      where: eq(hubs.id, hubId),
      with: {
        createdBy: true,
      },
    });

    return NextResponse.json({ hub: createdHub }, { status: 201 });
  } catch (error) {
    console.error('Error creating hub:', error);
    return NextResponse.json({ error: 'Failed to create hub' }, { status: 500 });
  }
}
