---
title: 'Next.js 14 e Server Actions: Modernizando Aplicações React'
slug: nextjs-14-server-actions
date: '2024-02-20'
excerpt: >
  Explorando as novas Server Actions do Next.js 14 e como elas simplificam 
  o desenvolvimento full-stack com React.
featuredImage:
  url: /images/img-placeholder.svg
  altText: Next.js 14 Server Actions
  type: ImageBlock
seo:
  metaTitle: 'Next.js 14 Server Actions: Guia Completo'
  metaDescription: >
    Aprenda a usar Server Actions do Next.js 14 para criar aplicações 
    React modernas e performáticas.
  metaTags: ['nextjs', 'react', 'server-actions', 'fullstack']
type: PostLayout
---

O Next.js 14 trouxe uma revolução com as Server Actions, permitindo que executemos código no servidor diretamente de componentes React. Neste post, exploro como essa funcionalidade está mudando o desenvolvimento full-stack.

## O Que São Server Actions?

Server Actions são funções assíncronas que executam no servidor e podem ser chamadas diretamente de componentes React, seja do lado cliente ou servidor. Elas eliminam a necessidade de criar rotas API separadas para muitas operações.

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

## Casos de Uso Práticos

### 1. Formulários Sem JavaScript

Server Actions funcionam mesmo com JavaScript desabilitado:

```tsx
import { createPost } from '@/actions/posts'

export default function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Título do post" required />
      <textarea name="content" placeholder="Conteúdo" required />
      <button type="submit">Criar Post</button>
    </form>
  )
}
```

### 2. Operações de Banco Otimizadas

Com Server Actions, podemos fazer operações complexas no servidor:

```typescript
'use server'

export async function updateUserProfile(userId: string, data: ProfileData) {
  // Validação no servidor
  const validatedData = profileSchema.parse(data)
  
  // Múltiplas operações em uma transação
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

### 3. Upload de Arquivos

Handling de uploads fica muito mais simples:

```typescript
'use server'

import { put } from '@vercel/blob'

export async function uploadImage(formData: FormData) {
  const file = formData.get('image') as File
  
  if (!file) {
    throw new Error('Arquivo é obrigatório')
  }
  
  const blob = await put(file.name, file, {
    access: 'public',
  })
  
  // Salvar referência no banco
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

## Integração com Hooks

Para interações mais complexas, podemos usar hooks:

```tsx
'use client'

import { useFormStatus } from 'react-dom'
import { createPost } from '@/actions/posts'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Criando...' : 'Criar Post'}
    </button>
  )
}

export default function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Título" />
      <textarea name="content" placeholder="Conteúdo" />
      <SubmitButton />
    </form>
  )
}
```

## Tratamento de Erros

Server Actions têm suporte nativo para tratamento de erros:

```typescript
'use server'

export async function deletePost(postId: string) {
  try {
    const post = await db.post.findUnique({
      where: { id: postId }
    })
    
    if (!post) {
      return { error: 'Post não encontrado' }
    }
    
    await db.post.delete({
      where: { id: postId }
    })
    
    revalidatePath('/posts')
    return { success: true }
    
  } catch (error) {
    console.error('Erro ao deletar post:', error)
    return { error: 'Erro interno do servidor' }
  }
}
```

## Validação com Zod

Combinando Server Actions com Zod para validação robusta:

```typescript
'use server'

import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100),
  content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
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
      error: 'Dados inválidos',
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

## Otimizações de Performance

### 1. Revalidação Inteligente

```typescript
'use server'

export async function updatePost(postId: string, data: PostData) {
  await db.post.update({
    where: { id: postId },
    data
  })
  
  // Revalidar apenas as páginas necessárias
  revalidatePath(`/posts/${postId}`)
  revalidatePath('/posts') // Lista de posts
  revalidateTag('user-posts') // Posts do usuário
}
```

### 2. Streaming de Dados

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

## Comparação: Antes vs Depois

### Antes (API Routes)

```typescript
// app/api/posts/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  const post = await db.post.create({ data: body })
  return Response.json(post)
}

// Componente cliente
const handleSubmit = async (data) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const result = await response.json()
}
```

### Depois (Server Actions)

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

// Componente
<form action={createPost}>
  {/* inputs */}
</form>
```

## Melhores Práticas

1. **Use TypeScript:** Server Actions se beneficiam muito da tipagem estática
2. **Validação sempre:** Nunca confie em dados do cliente
3. **Revalidação inteligente:** Seja específico sobre o que revalidar
4. **Tratamento de erros:** Sempre retorne estados de erro claros
5. **Progressive Enhancement:** Forms devem funcionar sem JS

## Conclusão

As Server Actions do Next.js 14 representam um grande passo na simplificação do desenvolvimento full-stack. Elas oferecem:

- **DX melhorado:** Menos boilerplate e configuração
- **Performance:** Execução no servidor com revalidação inteligente
- **Progressivo:** Funciona com e sem JavaScript
- **Type-safe:** Integração natural com TypeScript

Se você ainda não experimentou Server Actions, recomendo fortemente começar com casos simples como formulários e evoluir para operações mais complexas.

---

*Já está usando Server Actions em seus projetos? Compartilhe sua experiência no [LinkedIn](https://www.linkedin.com/in/thiago-peraro/) ou veja mais conteúdo técnico no meu [GitHub](https://github.com/tperaro).*
