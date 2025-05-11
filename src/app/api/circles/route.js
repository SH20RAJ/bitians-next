import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { circles, circleMembers, users } from '@/lib/db/schema';
import { desc, eq, sql, and } from 'drizzle-orm';
import { getSession } from '@/lib/auth/session';

// GET /api/circles - Get all circles with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get circles with creator info and member count
    const circlesData = await db.query.circles.findMany({
      orderBy: [desc(circles.createdAt)],
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

    // Get session to check if user is a member of each circle
    const session = await getSession();
    const currentUserId = session?.user?.id;

    // Transform the data to include member count and check if user is a member
    const transformedCircles = await Promise.all(circlesData.map(async (circle) => {
      // Get total member count
      const memberCountResult = await db
        .select({ count: sql`count(*)` })
        .from(circleMembers)
        .where(eq(circleMembers.circleId, circle.id));

      const memberCount = memberCountResult[0].count;

      // Check if current user is a member
      let isMember = false;
      let userRole = null;

      if (currentUserId) {
        const memberRecord = await db
          .select()
          .from(circleMembers)
          .where(
            and(
              eq(circleMembers.circleId, circle.id),
              eq(circleMembers.userId, currentUserId)
            )
          )
          .limit(1);

        if (memberRecord.length > 0) {
          isMember = true;
          userRole = memberRecord[0].role;
        }
      }

      // Return a transformed circle object (not a Response)
      return {
        id: circle.id,
        name: circle.name,
        description: circle.description,
        image: circle.image,
        isPrivate: circle.isPrivate,
        createdAt: circle.createdAt,
        createdBy: {
          id: circle.createdBy.id,
          name: circle.createdBy.name,
          username: circle.createdBy.username,
          image: circle.createdBy.image,
        },
        memberCount,
        isMember,
        userRole,
        recentMembers: circle.members.map(membership => ({
          id: membership.user.id,
          name: membership.user.name,
          username: membership.user.username,
          image: membership.user.image,
          role: membership.role,
        })),
      };
    }));

    // Get total count for pagination
    const totalCountResult = await db.select({ count: sql`count(*)` }).from(circles);
    const totalCount = totalCountResult[0].count;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      circles: transformedCircles,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching circles:', error);
    return NextResponse.json({ error: 'Failed to fetch circles' }, { status: 500 });
  }
}

// POST /api/circles - Create a new circle (protected)
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
      return NextResponse.json({ error: 'Circle name is required' }, { status: 400 });
    }

    // Create circle
    const circleId = crypto.randomUUID();
    await db.insert(circles).values({
      id: circleId,
      name: body.name,
      description: body.description || null,
      createdById: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: body.image || null,
      isPrivate: body.isPrivate || false,
    });

    // Add creator as admin member
    await db.insert(circleMembers).values({
      circleId,
      userId,
      role: 'admin',
      joinedAt: new Date(),
    });

    // Fetch the created circle with creator info
    const createdCircle = await db.query.circles.findFirst({
      where: eq(circles.id, circleId),
      with: {
        createdBy: true,
      },
    });

    return NextResponse.json({ circle: createdCircle }, { status: 201 });
  } catch (error) {
    console.error('Error creating circle:', error);
    return NextResponse.json({ error: 'Failed to create circle' }, { status: 500 });
  }
}
