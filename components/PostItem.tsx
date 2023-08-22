'use client'

import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import avatar from '@/images/1.png'
import Link from 'next/link'
import {twMerge} from 'tailwind-merge'
import Button from '@/components/Button'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {deletePost, getUserInfo, PostData} from '@/api/posts'
import toast from 'react-hot-toast'
import Avatar from '@/components/Avatar'
import getProfileData from '@/api/profile'
import {useProfile} from '@/hooks/useProfile'
import {useRouter} from "next/navigation";

interface PostItemProps {
  isProfilePostItem?: boolean
  post: PostData,
  setIsPostsChanged: Dispatch<SetStateAction<boolean>>
}

const PostItem: React.FC<PostItemProps> = ({isProfilePostItem, post, setIsPostsChanged}) => {
  const supabase = createClientComponentClient()
  const {user} = useProfile()

  const router = useRouter()

  const [username, setUsername] = useState(post?.author_id)
  const [postDate, setPostDate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const handleDeletePost = () => {
    deletePost(post.id, supabase)
      .catch((err) => {
        toast.error(err)
      })
      .finally(() => {
        setIsPostsChanged((prevState: boolean) => {
          return !prevState
        })
        toast.success('Post has been deleted!')
      })
  }

  useEffect(() => {
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
  }, [user, getUserInfo])

  return (
    <div
      className={twMerge(
        `
          flex
          flex-col
          gap-y-3
          text-neutral-300
          bg-neutral-400
          bg-opacity-20
          p-3
          rounded-lg
        `,
        !isProfilePostItem! && 'w-full md:w-[70%]'
      )}
    >
      <div className='flex w-full gap-x-4'>
        <Avatar url={avatarUrl} isPostItemAvatar/>
        <div className='flex flex-col gap-y-3 md:flex-row w-full md:justify-between'>
          <p className='text-2xl font-semibold'>{username}</p>
          <p className='text-emerald-500'>{postDate || ''}</p>
        </div>
      </div>
      <div
        className='
          line-clamp-5
          md:line-clamp-10
          text-md
          font-medium
        '
      >
        <span className='block text-xl font-bold mb-2'>{post.title}</span>
        <p>{post.content}</p>
      </div>
      <div className='flex flex-col sm:flex-row justify-between items-start gap-y-4 sm:gap-y-0 sm:items-end'>
        <div className='flex flex-col gap-y-4'>
          <Link
            href={`post/${post.id}`}
            className='
              text-emerald-500
              font-md
              underline
            '
          >
            See full capypost
          </Link>
        </div>
        <Button
          className={twMerge(
            `
          flex
          gap-x-2
          font-md
          p-2 
          w-fit 
          h-fit 
          bg-red-900 
          text-neutral-100
        `,
            !isProfilePostItem! && 'hidden'
          )}
          onClick={handleDeletePost}
        >
          <AiFillDelete size={20} />
          <p>Delete capypost</p>
        </Button>
      </div>
    </div>
  )
}

export default PostItem
