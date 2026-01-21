'use server';

import { eq, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db } from '../db';
import { post } from '../db/schema';

export async function createPost(
  userId: string,
  title: string,
  content: string,
  visibility: string,
) {
  const id = nanoid();
  const now = new Date();

  await db.insert(post).values({
    id,
    title,
    content,
    authorId: userId,
    visibility,
    createdAt: now,
    updatedAt: now,
  });

  return { id };
}

export async function getPublicPosts(limit = 20) {
  const posts = await db
    .select()
    .from(post)
    .where(eq(post.visibility, 'public'))
    .orderBy(desc(post.createdAt))
    .limit(limit);

  return posts;
}

export async function getPostById(postId: string, userId?: string) {
  const [result] = await db.select().from(post).where(eq(post.id, postId));

  if (result === undefined) return null;

  // Check visibility
  if (result.visibility === 'private' && result.authorId !== userId) {
    return null;
  }

  return result;
}

export async function getUserPosts(userId: string) {
  const posts = await db
    .select()
    .from(post)
    .where(eq(post.authorId, userId))
    .orderBy(desc(post.createdAt));

  return posts;
}
