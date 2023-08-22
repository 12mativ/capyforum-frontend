import {SupabaseClient, User} from '@supabase/supabase-js'

export interface PostData {
  id: string
  author_id: string
  created_at: string
  content: string
  title: string
  image_url: string
}

export const getAllPosts = async (
  supabase: SupabaseClient | null
): Promise<PostData[] | null> => {
  if (supabase) {
    const {data, error, status} = await supabase
      .from('posts')
      .select('*')
      .order('created_at', {ascending: false})

    if (error && status !== 406) {
      throw error
    }

    return (data as any) || null
  }

  return null
}

export const getUserPosts = async (
  supabase: SupabaseClient | null,
  user: User | null
): Promise<PostData[] | null> => {
  if (supabase) {
    const {data, error, status} = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', user?.id)
      .order('created_at', {ascending: false})

    if (error && status !== 406) {
      throw error
    }

    return (data as any) || null
  }
  return null
}

export const getPost = async (
  supabase: SupabaseClient | null,
  postId: string
): Promise<PostData | null> => {
  if (supabase) {
    const {data, error, status} = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (error && status !== 406) {
      throw error
    }

    return (data as any) || null
  }
  return null
}

export const getUserInfo = async (
  userId: string | null,
  supabase: SupabaseClient | null
): Promise<{username: string, avatar_url: string} | null> => {
  if (supabase) {
    const {data, error, status} = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', userId)
      .single()

    if (error && status !== 406) {
      throw error
    }
    return (data as any) || null
  }

  return null
}

export const createPost = async (
  userId: string,
  supabase: SupabaseClient | null,
  title: string,
  content: string
): Promise<PostData | null> => {
  if (supabase) {
    const {data, error, status} = await supabase.from('posts').insert([
      {
        author_id: userId,
        title: title,
        content: content,
        created_at: new Date().toISOString(),
      },
    ])

    if (error && status !== 406) {
      throw error
    }
    return (data as any) || null
  }
}

export const deletePost = async (
  postId: string,
  supabase: SupabaseClient | null
): Promise<PostData | null> => {
  if (supabase) {
    const {data, error, status} = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error && status !== 406) {
      throw error
    }
    return (data as any) || null
  }
}