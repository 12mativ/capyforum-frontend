'use client'

import React, {useCallback, useEffect, useState} from 'react'

import avatar from '../../images/1.png'
import PostItem from '@/components/PostItem'
import Button from '@/components/Button'
import {BiLogOut} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import {IoSettingsOutline} from 'react-icons/io5'
import {useRouter} from 'next/navigation'
import toast from 'react-hot-toast'
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import {
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import {Database} from '@/db_types'
import useUsernameModal from "@/hooks/useUsernameModal";
import {useProfile} from "@/hooks/useProfile";

const Profile = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  // const supabaseServer = createServerComponentClient<Database>({cookies})
  const {session} = useProfile()

  // const {
  //   data: {session},
  // } = await supabaseServer.auth.getSession()

  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user
  const usernameModal = useUsernameModal()

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let {data, error, status} = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  const handleLogout = async () => {
    const {error} = await supabaseClient.auth.signOut()
    router.refresh()
    router.push('/auth')

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }

  useEffect(() => {
    router.push('/profile')
    getProfile()
  }, [user, getProfile])

  return (
    <div className='flex gap-x-2 justify-between h-full'>
      <div
        className='
        hidden
        md:w-[100px]
        xl:w-[300px]
        md:flex
        flex-col
        md:items-center
        xl:items-start
        overflow-y-auto
        h-full
        bg-neutral-100
        bg-opacity-20
        p-2
        rounded-lg
        gap-y-3
      '
      >
        <div className='flex gap-x-3'>
          <img
            src={avatar.src}
            alt='user_avatar'
            className='w-[70px] h-[70px] rounded-lg'
          />
          <p className='hidden xl:block'>
            {!loading ? (username ? username : user.email) : 'Loading...'}
          </p>
        </div>
        <Button
          type='button'
          className='xl:hidden flex items-center justify-center px-3 py-3 w-fit'
        >
          <AiOutlinePlus size={26} />
        </Button>
        <Button className='xl:hidden flex items-center justify-center px-3 py-3 w-fit'>
          <IoSettingsOutline size={26} />
        </Button>
        <Button
          className='
            xl:hidden
            flex
            items-center
            justify-center
            bg-neutral-200
            text-emerald-500
            px-3
            py-3
            w-fit
          '
          onClick={handleLogout}
        >
          <BiLogOut size={26} />
        </Button>
        <Button
          type='button'
          className='md:hidden xl:flex items-center justify-center gap-x-2'
        >
          <AiOutlinePlus size={20} />
          <p>Create new post</p>
        </Button>
        <Button
          type='button'
          className='md:hidden xl:flex items-center justify-center gap-x-2'
        >
          <IoSettingsOutline size={20} />
          <p>Edit profile</p>
        </Button>
        <Button
          type='button'
          className='
            md:hidden
            xl:flex
            items-center
            justify-center
            gap-x-2
            bg-neutral-200
            text-emerald-500
          '
          onClick={handleLogout}
        >
          <BiLogOut size={20} />
          <p>Log out</p>
        </Button>
      </div>
      <div className='flex flex-col gap-y-2 h-full w-full'>
        <PostItem isProfilePostItem />
        <PostItem isProfilePostItem />
        <PostItem isProfilePostItem />
      </div>
    </div>
  )
}

export default Profile
