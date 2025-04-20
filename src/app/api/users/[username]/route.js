import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, posts, follows, circles, circleMembers, hubs, hubMembers } from '@/lib/db/schema';
import { eq, desc, and, count, sql } from 'drizzle-orm';
import { getSession } from '@/lib/auth/session';

// GET /api/users/[username] - Get user profile
export async function GET(request, { params }) {
  try {
    const { username } = params;
    
    // Get user data
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get post count
    const postCountResult = await db
      .select({ count: sql`count(*)` })
      .from(posts)
      .where(eq(posts.userId, user.id));
    
    const postCount = postCountResult[0].count;
    
    // Get follower count
    const followerCountResult = await db
      .select({ count: sql`count(*)` })
      .from(follows)
      .where(eq(follows.followingId, user.id));
    
    const followerCount = followerCountResult[0].count;
    
    // Get following count
    const followingCountResult = await db
      .select({ count: sql`count(*)` })
      .from(follows)
      .where(eq(follows.followerId, user.id));
    
    const followingCount = followingCountResult[0].count;
    
    // Check if current user is following this user
    let isFollowing = false;
    const session = await getSession();
    
    if (session && session.user) {
      const followRecord = await db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.followerId, session.user.id),
            eq(follows.followingId, user.id)
          )
        )
        .limit(1);
      
      isFollowing = followRecord.length > 0;
    }
    
    // Get circles the user is a member of
    const userCircles = await db.query.circleMembers.findMany({
      where: eq(circleMembers.userId, user.id),
      with: {
        circle: true,
      },
      limit: 5,
    });
    
    // Get hubs the user is a member of
    const userHubs = await db.query.hubMembers.findMany({
      where: eq(hubMembers.userId, user.id),
      with: {
        hub: true,
      },
      limit: 5,
    });
    
    // Get recent posts
    const userPosts = await db.query.posts.findMany({
      where: eq(posts.userId, user.id),
      orderBy: [desc(posts.createdAt)],
      limit: 9,
      with: {
        media: true,
        likes: true,
        comments: true,
      },
    });
    
    // Transform posts data
    const transformedPosts = userPosts.map(post => ({
      id: post.id,
      createdAt: post.createdAt,
      media: post.media.map(m => ({
        id: m.id,
        url: m.url,
        type: m.type,
      })),
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
    }));
    
    // Prepare response
    const userProfile = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      image: user.image,
      bio: user.bio,
      department: user.department,
      year: user.year,
      isVerified: user.isVerified,
      stats: {
        postsCount: postCount,
        followersCount: followerCount,
        followingCount: followingCount,
      },
      isFollowing,
      circles: userCircles.map(membership => ({
        id: membership.circle.id,
        name: membership.circle.name,
        image: membership.circle.image,
        role: membership.role,
      })),
      hubs: userHubs.map(membership => ({
        id: membership.hub.id,
        name: membership.hub.name,
        image: membership.hub.image,
        role: membership.role,
      })),
      posts: transformedPosts,
    };
    
    return NextResponse.json({ user: userProfile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}
