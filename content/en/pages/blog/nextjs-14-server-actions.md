---
title: 'Next.js 14 and Server Actions: Modernizing React Applications'
slug: nextjs-14-server-actions
translationKey: nextjs-14-server-actions
date: '2024-02-20'
excerpt: >
  Exploring the new Server Actions from Next.js 14 and how they simplify
  full-stack development with React.
featuredImage:
  url: /images/img-placeholder.svg
  altText: Next.js 14 Server Actions
  type: ImageBlock
seo:
  metaTitle: 'Next.js 14 Server Actions: Complete Guide'
  metaDescription: >
    Learn to use Next.js 14 Server Actions to create modern and performant
    React applications.
  metaTags: ['nextjs', 'react', 'server-actions', 'fullstack']
type: PostLayout
---

Next.js 14 brought a revolution with Server Actions, allowing us to execute code on the server directly from React components. In this post, I explore how this functionality is changing full-stack development.

## What Are Server Actions?

Server Actions are asynchronous functions that run on the server and can be called directly from React components, either client-side or server-side. They eliminate the need to create separate API routes for many operations.

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const post = await db.post.create({
    data: { title, content }
  })

  revalidatePath('/posts')
  return { success: true, postId: post.id }
}
```

## Practical Use Cases

### 1. Forms Without JavaScript

Server Actions work even with JavaScript disabled:

```tsx
import { createPost } from '@/actions/posts'

export default function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

### 2. Optimized Database Operations

With Server Actions, we can perform complex operations on the server:

```typescript
'use server'

export async function updateUserProfile(userId: string, data: ProfileData) {
  // Server-side validation
  const validatedData = profileSchema.parse(data)

  // Multiple operations in one transaction
  await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: validatedData
    })

    await tx.activityLog.create({
      data: {
        userId,
        action: 'PROFILE_UPDATE',
        details: validatedData
      }
    })
  })

  revalidatePath(`/profile/${userId}`)
}
```

### 3. File Upload

File handling becomes much simpler:

```typescript
'use server'

import { put } from '@vercel/blob'

export async function uploadImage(formData: FormData) {
  const file = formData.get('image') as File

  if (!file) {
    throw new Error('File is required')
  }

  const blob = await put(file.name, file, {
    access: 'public',
  })

  // Save reference in database
  await db.image.create({
    data: {
      url: blob.url,
      filename: file.name,
      size: file.size
    }
  })

  return { url: blob.url }
}
```

## Integration with Hooks

For more complex interactions, we can use hooks:

```tsx
'use client'

import { useFormStatus } from 'react-dom'
import { createPost } from '@/actions/posts'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  )
}

export default function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <SubmitButton />
    </form>
  )
}
```

## Error Handling

Server Actions have native support for error handling:

```typescript
'use server'

export async function deletePost(postId: string) {
  try {
    const post = await db.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return { error: 'Post not found' }
    }

    await db.post.delete({
      where: { id: postId }
    })

    revalidatePath('/posts')
    return { success: true }

  } catch (error) {
    console.error('Error deleting post:', error)
    return { error: 'Internal server error' }
  }
}
```

## Validation with Zod

Combining Server Actions with Zod for robust validation:

```typescript
'use server'

import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(10, 'Content must have at least 10 characters'),
  tags: z.array(z.string()).optional()
})

export async function createPost(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
    tags: formData.getAll('tags')
  }

  const validationResult = postSchema.safeParse(rawData)

  if (!validationResult.success) {
    return {
      error: 'Invalid data',
      fieldErrors: validationResult.error.flatten().fieldErrors
    }
  }

  const { title, content, tags } = validationResult.data

  const post = await db.post.create({
    data: { title, content, tags }
  })

  revalidatePath('/posts')
  redirect(`/posts/${post.id}`)
}
```

## Performance Optimizations

### 1. Smart Revalidation

```typescript
'use server'

export async function updatePost(postId: string, data: PostData) {
  await db.post.update({
    where: { id: postId },
    data
  })

  // Revalidate only necessary pages
  revalidatePath(`/posts/${postId}`)
  revalidatePath('/posts') // Posts list
  revalidateTag('user-posts') // User's posts
}
```

### 2. Data Streaming

```tsx
import { Suspense } from 'react'

async function PostsList() {
  const posts = await getPosts() // Server Action

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default function PostsPage() {
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <PostsList />
    </Suspense>
  )
}
```

## Comparison: Before vs After

### Before (API Routes)

```typescript
// app/api/posts/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  const post = await db.post.create({ data: body })
  return Response.json(post)
}

// Client component
const handleSubmit = async (data) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const result = await response.json()
}
```

### After (Server Actions)

```typescript
// actions/posts.ts
'use server'
export async function createPost(formData: FormData) {
  const post = await db.post.create({
    data: {
      title: formData.get('title'),
      content: formData.get('content')
    }
  })
  return post
}

// Component
<form action={createPost}>
  {/* inputs */}
</form>
```

## Best Practices

1. **Use TypeScript:** Server Actions greatly benefit from static typing
2. **Always validate:** Never trust client data
3. **Smart revalidation:** Be specific about what to revalidate
4. **Error handling:** Always return clear error states
5. **Progressive Enhancement:** Forms should work without JS

## Conclusion

Next.js 14 Server Actions represent a big step in simplifying full-stack development. They offer:

- **Improved DX:** Less boilerplate and configuration
- **Performance:** Server execution with smart revalidation
- **Progressive:** Works with and without JavaScript
- **Type-safe:** Natural integration with TypeScript

If you haven't tried Server Actions yet, I strongly recommend starting with simple cases like forms and evolving to more complex operations.

---

*Already using Server Actions in your projects? Share your experience on [LinkedIn](https://www.linkedin.com/in/thiago-peraro/) or check more technical content on my [GitHub](https://github.com/tperaro).*
