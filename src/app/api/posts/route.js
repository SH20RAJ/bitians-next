import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, users, media, comments, likes } from '@/lib/db/schema';
import { desc, eq, sql, and, isNull } from 'drizzle-orm';
import { getSession } from '@/lib/auth/session';

export const runtime = 'edge';

// GET /api/posts - Get all posts with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get posts with user info, media, comment count, and like count
    const postsData = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      limit,
      offset,
      with: {
        user: true,
        media: true,
        comments: {
          where: and(
            isNull(comments.parentId)
          ),
          limit: 2,
          with: {
            user: true,
          },
        },
        likes: true,
      },
    });

    // Transform the data to include comment count and like count
    const transformedPosts = postsData.map(post => {
      const { comments, likes, ...postData } = post;
      // Return a transformed post object (not a Response)
      return {
        ...postData,
        commentsCount: comments.length,
        likesCount: likes.length,
        comments: comments.map(comment => ({
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          user: {
            id: comment.user.id,
            name: comment.user.name,
            username: comment.user.username,
            image: comment.user.image,
          },
        })),
        media: post.media.map(m => ({
          id: m.id,
          url: m.url,
          type: m.type,
        })),
        user: {
          id: post.user.id,
          name: post.user.name,
          username: post.user.username,
          image: post.user.image,
          isVerified: post.user.isVerified,
        },
      };
    });

    // Get total count for pagination
    const totalCountResult = await db.select({ count: sql`count(*)` }).from(posts);
    const totalCount = totalCountResult[0].count;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST /api/posts - Create a new post (protected)
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
    if (!body.content && (!body.media || body.media.length === 0)) {
      return NextResponse.json({ error: 'Post must have content or media' }, { status: 400 });
    }

    // Create post
    const postId = crypto.randomUUID();
    await db.insert(posts).values({
      id: postId,
      userId,
      content: body.content || null,
      type: body.type || 'post',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: true,
    });

    // Add media if provided
    if (body.media && body.media.length > 0) {
      const mediaValues = body.media.map(m => ({
        id: crypto.randomUUID(),
        postId,
        userId,
        url: m.url,
        type: m.type,
        createdAt: new Date(),
      }));

      await db.insert(media).values(mediaValues);
    }

    // Fetch the created post with user info
    const createdPost = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      with: {
        user: true,
        media: true,
      },
    });

    return NextResponse.json({ post: createdPost }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
