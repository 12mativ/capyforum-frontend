'use client'

import React, {useEffect, useState} from 'react'
import PostItem from '@/components/PostItem'
import ProfileMenu from '@/components/ProfileMenu'
import {useRouter} from 'next/navigation'
import ProfileData from "@/components/ProfileData";
import toast from "react-hot-toast";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {getUserPosts, PostData} from "@/api/posts";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useProfile} from "@/hooks/useProfile";

const Profile = () => {
  const router = useRouter()

  const supabaseClient = useSupabaseClient()
  const supabase = createClientComponentClient()
  const {user} = useProfile()

  const [posts, setPosts] = useState<PostData[] | null>(null)
  const [isPostsChanged, setIsPostsChanged] = useState<boolean>(false)

  const handleLogout = async () => {
    const {error} = await supabaseClient.auth.signOut()
    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }

  useEffect(() => {
    if (user) {
      getUserPosts(supabase, user)
        .then((res) => {
          if (res) {
            setPosts(res)
          }
        })
        .catch((err) => {
          throw err
        })
    }
  }, [user, isPostsChanged])

  useEffect(() => {
    router.push('/profile')
  }, [])

  return (
    <div className='flex gap-x-2 justify-between h-full'>
      <ProfileMenu />
      <div className='flex flex-col gap-y-2 h-full w-full'>
        <ProfileData />
        <div className='bg-neutral-400 bg-opacity-40 text-xl p-3 mt-3 rounded-lg'>
          <p>Your capyposts</p>
        </div>
        {posts?.length !== 0 ? posts?.map(post => {
          return <PostItem isProfilePostItem key={post.id} setIsPostsChanged={setIsPostsChanged} post={post} />
        }) : <p>You have no posts :(</p>}
      </div>
    </div>
  )
}

export default Profile
