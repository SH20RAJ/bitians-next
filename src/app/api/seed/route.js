import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  users,
  posts,
  media,
  comments,
  likes,
  follows,
  circles,
  circleMembers,
  hubs,
  hubMembers
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

// GET /api/seed - Seed the database with sample data
export async function GET(request) {
  try {
    // Check if database already has users
    const existingUsers = await db.select().from(users).limit(1);

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: 'Database already has data. Skipping seeding.' });
    }

    // Sample user data
    const sampleUsers = [
      {
        id: crypto.randomUUID(),
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        username: 'rahul_sharma',
        image: 'https://i.pravatar.cc/300?img=1',
        bio: 'Computer Science student at BIT Mesra | Web Developer | AI Enthusiast',
        department: 'Computer Science',
        year: '3rd Year',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        username: 'priya_patel',
        image: 'https://i.pravatar.cc/300?img=5',
        bio: 'Electronics Engineering | Tech Blogger | Music Lover',
        department: 'Electronics',
        year: '2nd Year',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: 'Amit Kumar',
        email: 'amit.kumar@example.com',
        username: 'amit_kumar',
        image: 'https://i.pravatar.cc/300?img=3',
        bio: 'Mechanical Engineering | Sports Enthusiast | Photographer',
        department: 'Mechanical',
        year: '4th Year',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: 'Neha Gupta',
        email: 'neha.gupta@example.com',
        username: 'neha_gupta',
        image: 'https://i.pravatar.cc/300?img=4',
        bio: 'Civil Engineering | Travel Lover | Foodie',
        department: 'Civil',
        year: '3rd Year',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        username: 'vikram_singh',
        image: 'https://i.pravatar.cc/300?img=7',
        bio: 'Information Technology | Gamer | Coder',
        department: 'Information Technology',
        year: '2nd Year',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert users
    await db.insert(users).values(sampleUsers);

    // Get user IDs
    const userRecords = await db.select({ id: users.id }).from(users);
    const userIds = userRecords.map(user => user.id);

    // Sample post data
    const samplePosts = [];
    const postTypes = ['text', 'photo', 'video', 'poll'];
    const postContents = [
      'Enjoying the weekend! #weekend #fun',
      'Beautiful sunset today 🌅 #nature #photography',
      'New project coming soon! Stay tuned 👀',
      'Campus life at BIT Mesra ❤️ #college #bitians',
      'Study session with friends #study #exams',
      'Just finished my assignment! #relief',
      'Excited for the upcoming tech fest! #techfest #bitians',
      'Morning coffee and coding ☕💻 #developer #coding',
      'Great lecture today on AI #artificialintelligence #learning',
      'Weekend vibes at campus #weekend #campus',
    ];

    for (let i = 0; i < 20; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const type = postTypes[Math.floor(Math.random() * postTypes.length)];
      const content = postContents[Math.floor(Math.random() * postContents.length)];

      samplePosts.push({
        id: crypto.randomUUID(),
        userId,
        content,
        type,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
        updatedAt: new Date(),
        isPublished: true,
      });
    }

    // Insert posts
    await db.insert(posts).values(samplePosts);

    // Get post IDs
    const postRecords = await db.select({ id: posts.id }).from(posts);
    const postIds = postRecords.map(post => post.id);

    // Sample media data
    const sampleMedia = [];
    const mediaTypes = ['image', 'video'];

    for (let i = 0; i < postIds.length; i++) {
      const postId = postIds[i];
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const type = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];

      // Add 1-3 media items per post
      const mediaCount = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < mediaCount; j++) {
        const imageId = Math.floor(Math.random() * 1000);
        const url = type === 'image'
          ? `https://picsum.photos/id/${imageId}/800/800`
          : `https://example.com/videos/sample${j + 1}.mp4`;

        sampleMedia.push({
          id: crypto.randomUUID(),
          postId,
          userId,
          url,
          type,
          createdAt: new Date(),
        });
      }
    }

    // Insert media
    await db.insert(media).values(sampleMedia);

    // Sample comments data
    const sampleComments = [];
    const commentContents = [
      'Great post! 👍',
      'This is awesome!',
      'Thanks for sharing!',
      'I love this! ❤️',
      'Interesting perspective.',
      'Can\'t wait to see more!',
      'This made my day!',
      'Totally agree with you.',
      'Keep up the good work!',
      'This is so inspiring!',
    ];

    for (let i = 0; i < 50; i++) {
      const postId = postIds[Math.floor(Math.random() * postIds.length)];
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const content = commentContents[Math.floor(Math.random() * commentContents.length)];

      sampleComments.push({
        id: crypto.randomUUID(),
        postId,
        userId,
        content,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000), // Random date within last 7 days
        updatedAt: new Date(),
      });
    }

    // Insert comments
    await db.insert(comments).values(sampleComments);

    // Get comment IDs
    const commentRecords = await db.select({ id: comments.id }).from(comments);
    const commentIds = commentRecords.map(comment => comment.id);

    // Sample likes data
    const sampleLikes = [];

    // Add likes to posts
    for (let i = 0; i < 100; i++) {
      const postId = postIds[Math.floor(Math.random() * postIds.length)];
      const userId = userIds[Math.floor(Math.random() * userIds.length)];

      sampleLikes.push({
        id: crypto.randomUUID(),
        postId,
        userId,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000), // Random date within last 14 days
      });
    }

    // Insert likes
    await db.insert(likes).values(sampleLikes);

    // Sample follows data
    const sampleFollows = [];

    for (let i = 0; i < userIds.length; i++) {
      const followerId = userIds[i];

      // Each user follows 1-3 random users
      const followCount = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < followCount; j++) {
        const followingId = userIds[Math.floor(Math.random() * userIds.length)];

        // Don't follow yourself
        if (followerId !== followingId) {
          sampleFollows.push({
            followerId,
            followingId,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
          });
        }
      }
    }

    // Insert follows
    await db.insert(follows).values(sampleFollows);

    // Sample circles data
    const circleNames = [
      'CS Department',
      'Project Team',
      'Study Group',
      'Campus Events',
      'Coding Club',
      'Photography Club',
      'Sports Team',
      'Music Band',
    ];

    const circleDescriptions = [
      'A group for Computer Science students to discuss coursework and share resources.',
      'Team working on the final year project.',
      'Group for studying together and preparing for exams.',
      'Planning and organizing campus events and activities.',
      'For coding enthusiasts to share projects and learn together.',
      'Capturing and sharing beautiful moments around campus.',
      'Organizing sports events and practices.',
      'For music lovers to jam and perform together.',
    ];

    const sampleCircles = [];

    for (let i = 0; i < circleNames.length; i++) {
      const createdById = userIds[Math.floor(Math.random() * userIds.length)];

      sampleCircles.push({
        id: crypto.randomUUID(),
        name: circleNames[i],
        description: circleDescriptions[i],
        createdById,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000), // Random date within last 60 days
        updatedAt: new Date(),
        image: `https://picsum.photos/id/${(i + 1) * 10}/300/300`,
        isPrivate: Math.random() > 0.5 ? 1 : 0,
      });
    }

    // Insert circles
    await db.insert(circles).values(sampleCircles);

    // Get circle IDs
    const circleRecords = await db.select({ id: circles.id }).from(circles);
    const circleIds = circleRecords.map(circle => circle.id);

    // Sample circle members data
    const sampleCircleMembers = [];

    for (let i = 0; i < circleIds.length; i++) {
      const circleId = circleIds[i];

      // Add 3-5 members to each circle
      const memberCount = Math.floor(Math.random() * 3) + 3;

      for (let j = 0; j < memberCount; j++) {
        const userId = userIds[Math.floor(Math.random() * userIds.length)];
        const role = j === 0 ? 'admin' : (j === 1 && Math.random() > 0.5 ? 'moderator' : 'member');

        sampleCircleMembers.push({
          circleId,
          userId,
          role,
          joinedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
        });
      }
    }

    // Insert circle members
    await db.insert(circleMembers).values(sampleCircleMembers);

    // Sample hubs data
    const hubNames = [
      'Tech Discussions',
      'Campus Life',
      'Career Advice',
      'Hobby Club',
      'Academic Help',
      'Alumni Network',
      'Internship Opportunities',
      'Research Group',
    ];

    const hubDescriptions = [
      'Discuss the latest in technology and share interesting articles.',
      'Share your campus experiences and connect with fellow students.',
      'Get advice on career paths and job opportunities.',
      'Connect with others who share your hobbies and interests.',
      'Ask questions and get help with your coursework.',
      'Network with alumni and get insights into life after graduation.',
      'Find and share internship opportunities.',
      'Collaborate on research projects and share findings.',
    ];

    const sampleHubs = [];

    for (let i = 0; i < hubNames.length; i++) {
      const createdById = userIds[Math.floor(Math.random() * userIds.length)];

      sampleHubs.push({
        id: crypto.randomUUID(),
        name: hubNames[i],
        description: hubDescriptions[i],
        createdById,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000), // Random date within last 60 days
        updatedAt: new Date(),
        image: `https://picsum.photos/id/${(i + 1) * 20}/300/300`,
        coverImage: `https://picsum.photos/id/${(i + 1) * 20 + 5}/900/300`,
        isVerified: Math.random() > 0.7 ? 1 : 0,
      });
    }

    // Insert hubs
    await db.insert(hubs).values(sampleHubs);

    // Get hub IDs
    const hubRecords = await db.select({ id: hubs.id }).from(hubs);
    const hubIds = hubRecords.map(hub => hub.id);

    // Sample hub members data
    const sampleHubMembers = [];

    for (let i = 0; i < hubIds.length; i++) {
      const hubId = hubIds[i];

      // Add 5-10 members to each hub
      const memberCount = Math.floor(Math.random() * 6) + 5;

      for (let j = 0; j < memberCount; j++) {
        const userId = userIds[Math.floor(Math.random() * userIds.length)];
        const role = j === 0 ? 'admin' : (j === 1 && Math.random() > 0.5 ? 'moderator' : 'member');

        sampleHubMembers.push({
          hubId,
          userId,
          role,
          joinedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
        });
      }
    }

    // Insert hub members
    await db.insert(hubMembers).values(sampleHubMembers);

    return NextResponse.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
