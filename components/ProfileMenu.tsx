'use client'

import React from 'react'
import Button from '@/components/Button'
import toast from 'react-hot-toast'
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import {useRouter} from 'next/navigation'
import {AiOutlinePlus} from 'react-icons/ai'
import {IoSettingsOutline} from 'react-icons/io5'
import {BiLogOut} from 'react-icons/bi'
import Link from 'next/link'

const ProfileMenu = () => {
  const supabaseClient = useSupabaseClient()

  const router = useRouter()

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

  return (
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
      <Button
        type='button'
        className='xl:hidden flex items-center justify-center px-3 py-3 w-fit'
      >
        <AiOutlinePlus size={26} />
      </Button>
      <Link href={'/profile/edit'}>
        <Button className='xl:hidden flex items-center justify-center px-3 py-3 w-fit'>
          <IoSettingsOutline size={26} />
        </Button>
      </Link>
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
      <Link href={'/profile/edit'} className='w-full'>
        <Button
          type='button'
          className='md:hidden xl:flex items-center justify-center gap-x-2'
        >
          <IoSettingsOutline size={20} />
          <p>Edit profile</p>
        </Button>
      </Link>
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
  )
}

export default ProfileMenu
