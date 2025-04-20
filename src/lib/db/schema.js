import { relations } from 'drizzle-orm';
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  blob
} from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'timestamp' }),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
  username: text('username').unique(),
  bio: text('bio'),
  department: text('department'),
  year: text('year'),
  isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
});

// Accounts table (for OAuth providers)
export const accounts = sqliteTable('accounts', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (table) => ({
  providerProviderAccountIdKey: primaryKey({
    columns: [table.provider, table.providerAccountId],
  }),
}));

// Sessions table
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
});

// Verification tokens table
export const verificationTokens = sqliteTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  compoundKey: primaryKey({ columns: [table.identifier, table.token] }),
}));

// Posts table
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
  type: text('type').default('post'), // post, photo, video, poll, etc.
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
});

// Media table (for post attachments)
export const media = sqliteTable('media', {
  id: text('id').primaryKey(),
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  type: text('type').notNull(), // image, video, etc.
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
});

// Comments table
export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
  parentId: text('parent_id').references(() => comments.id),
});

// Likes table
export const likes = sqliteTable('likes', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  commentId: text('comment_id').references(() => comments.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
});

// Follows table
export const follows = sqliteTable('follows', {
  followerId: text('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followingId: text('following_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
}, (table) => ({
  uniqFollowerFollowing: primaryKey({ columns: [table.followerId, table.followingId] }),
}));

// Circles (private groups)
export const circles = sqliteTable('circles', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdById: text('created_by_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
  image: text('image'),
  isPrivate: integer('is_private', { mode: 'boolean' }).default(true),
});

// Circle members
export const circleMembers = sqliteTable('circle_members', {
  circleId: text('circle_id').notNull().references(() => circles.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('member'), // admin, moderator, member
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().defaultNow(),
}, (table) => ({
  uniqUserCircle: primaryKey({ columns: [table.userId, table.circleId] }),
}));

// Hubs (public communities)
export const hubs = sqliteTable('hubs', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdById: text('created_by_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
  image: text('image'),
  coverImage: text('cover_image'),
  isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
});

// Hub members
export const hubMembers = sqliteTable('hub_members', {
  hubId: text('hub_id').notNull().references(() => hubs.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('member'), // admin, moderator, member
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().defaultNow(),
}, (table) => ({
  uniqUserHub: primaryKey({ columns: [table.userId, table.hubId] }),
}));

// Messages
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: text('receiver_id').references(() => users.id, { onDelete: 'cascade' }),
  circleId: text('circle_id').references(() => circles.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
});

// Notifications
export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  actorId: text('actor_id').references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // like, comment, follow, mention, etc.
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  commentId: text('comment_id').references(() => comments.id, { onDelete: 'cascade' }),
  circleId: text('circle_id').references(() => circles.id, { onDelete: 'cascade' }),
  hubId: text('hub_id').references(() => hubs.id, { onDelete: 'cascade' }),
  message: text('message'),
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
});

// Collections (saved content)
export const collections = sqliteTable('collections', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  isPrivate: integer('is_private', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
  image: text('image'),
});

// Collection items
export const collectionItems = sqliteTable('collection_items', {
  id: text('id').primaryKey(),
  collectionId: text('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  mediaId: text('media_id').references(() => media.id, { onDelete: 'cascade' }),
  addedAt: integer('added_at', { mode: 'timestamp' }).notNull().defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
  followers: many(follows, { relationName: 'followers' }),
  following: many(follows, { relationName: 'following' }),
  circlesCreated: many(circles),
  circleMemberships: many(circleMembers),
  hubsCreated: many(hubs),
  hubMemberships: many(hubMembers),
  messagesSent: many(messages, { relationName: 'sent' }),
  messagesReceived: many(messages, { relationName: 'received' }),
  notifications: many(notifications),
  collections: many(collections),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
  media: many(media),
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, { fields: [comments.userId], references: [users.id] }),
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  parent: one(comments, { fields: [comments.parentId], references: [comments.id] }),
  replies: many(comments, { relationName: 'replies' }),
  likes: many(likes),
}));

export const circlesRelations = relations(circles, ({ one, many }) => ({
  createdBy: one(users, { fields: [circles.createdById], references: [users.id] }),
  members: many(circleMembers),
  messages: many(messages),
}));

export const hubsRelations = relations(hubs, ({ one, many }) => ({
  createdBy: one(users, { fields: [hubs.createdById], references: [users.id] }),
  members: many(hubMembers),
}));

export const circlesMembersRelations = relations(circleMembers, ({ one }) => ({
  circle: one(circles, { fields: [circleMembers.circleId], references: [circles.id] }),
  user: one(users, { fields: [circleMembers.userId], references: [users.id] }),
}));

export const hubMembersRelations = relations(hubMembers, ({ one }) => ({
  hub: one(hubs, { fields: [hubMembers.hubId], references: [hubs.id] }),
  user: one(users, { fields: [hubMembers.userId], references: [users.id] }),
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, { fields: [collections.userId], references: [users.id] }),
  items: many(collectionItems),
}));
