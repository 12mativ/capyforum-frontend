'use client'

import React, {useEffect, useState} from 'react'
import getProfileData from '@/api/profile'
import {useProfile} from '@/hooks/useProfile'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import Avatar from '@/components/Avatar'

const ProfileData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [username, setUsername] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)

  const supabase = createClientComponentClient()
  const {user, session} = useProfile()

  useEffect(() => {
    setIsLoading(true)
    getProfileData(supabase, session, user)
      .then((res) => {
        if (res) {
          setUsername(res.username)
          setAvatarUrl(res.avatar_url)
          setFullName(res.full_name)
          setWebsite(res.website)
        }
      })
      .finally(() => setIsLoading(false))
  }, [user, getProfileData])

  return (
    <div
      className='
        flex
        h-full
        bg-neutral-100
        bg-opacity-20
        p-2
        rounded-lg
        gap-y-3
      '
    >
      <div className='flex flex-col sm:flex-row gap-y-3 sm:gap-x-3'>
        <Avatar url={avatarUrl} />
        <div className='flex flex-col gap-y-4'>
          <p className='text-2xl font-bold'>{username || user?.email}</p>
          <p className='text-lg'>Full name: {fullName}</p>
          <p className='text-lg'>Website: {website}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileData
