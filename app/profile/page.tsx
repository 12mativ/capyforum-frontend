'use client'

import React, {useEffect} from 'react'
import PostItem from '@/components/PostItem'
import ProfileMenu from '@/components/ProfileMenu'
import {useRouter} from 'next/navigation'
import ProfileData from "@/components/ProfileData";

const Profile = () => {
  const router = useRouter()

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
        <PostItem isProfilePostItem />
        <PostItem isProfilePostItem />
        <PostItem isProfilePostItem />
      </div>
    </div>
  )
}

export default Profile
