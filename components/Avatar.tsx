'use client'
import React, {useEffect, useState} from 'react'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import {Database} from '@/db_types'
import toast from 'react-hot-toast'
import avatar from '@/images/1.png'

type Profiles = Database['public']['Tables']['profiles']['Row']

const Avatar = ({url}: {url: Profiles['avatar_url']; size: number}) => {
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const {data, error} = await supabase.storage
          .from('avatars')
          .download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        toast.error('Error downloading image: ' + error.toString())
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  return (
    <div
      className='
        flex
        flex-col
        justify-center
        self-start
        w-[180px] h-[180px]
        md:w-[200px] md:h-[200px]
        lg:w-[250px] lg:h-[250px]
        relative
      '
    >
      {avatarUrl ? (
        <Image
          fill={true}
          src={avatarUrl}
          alt='Avatar'
          className='rounded-lg'
        />
      ) : (
        <img
          src={avatar.src}
          alt='Avatar'
          className='
            w-[180px] h-[180px]
            md:w-[200px] md:h-[200px]
            lg:w-[250px] lg:h-[250px]
            rounded-lg
          '
        />
      )}
    </div>
  )
}

export default Avatar
