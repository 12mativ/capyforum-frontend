'use client'

import React, {useEffect, useState} from 'react'
import {getPost, getUserInfo, PostData} from '@/api/posts'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import {AiOutlineArrowLeft} from 'react-icons/ai'

const Post = ({params}: {params: {postId: string}}) => {
  const supabase = createClientComponentClient()
  const [post, setPost] = useState<PostData | null>(null)
  const [username, setUsername] = useState(post?.author_id)
  const [postDate, setPostDate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const router = useRouter()
  useEffect(() => {
    setIsLoading(true)
    getPost(supabase, params.postId)
      .then((res) => {
        if (res) {
          setPost(res)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [params.postId])

  useEffect(() => {
    if (post) {
      getUserInfo(post.author_id, supabase).then((res) => {
        if (res) {
          if (res.username) {
            setUsername(res.username)
          }
          if (res.avatar_url) {
            setAvatarUrl(res.avatar_url)
          }
          const date = new Date(post.created_at)
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`
          const formattedTime = `${date.getHours()}:${date.getMinutes()}`
          setPostDate(`${formattedDate} - ${formattedTime}`)
        }
      })
    }
  }, [post])

  return (
    <div className='flex flex-col gap-y-4'>
      <Button
        className='flex items-center justify-center gap-x-2 w-fit bg-neutral-200 text-emerald-500 font-bold mb-4'
        onClick={() => router.back()}
      >
        <AiOutlineArrowLeft size={20} />
        <p>Back</p>
      </Button>

      <div className='flex w-full gap-x-4'>
        <Avatar url={avatarUrl} isPostItemAvatar />
        <div className='flex flex-col gap-y-3 md:flex-row w-full md:justify-between'>
          <p className='text-2xl font-semibold'>{username}</p>
          <p className='text-emerald-500'>{postDate || ''}</p>
        </div>
      </div>

      <p className='text-center text-3xl mt-2'>{post?.title}</p>
      <p className='leading-relaxed px-2 pb-2'>{post?.content}</p>
    </div>
  )
}

export default Post
