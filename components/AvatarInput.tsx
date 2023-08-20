'use client'
import React, {useEffect, useState} from 'react'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import {Database} from '@/types_db'
import toast from 'react-hot-toast'
import avatar from '@/images/1.png'
import {AiOutlineUpload} from 'react-icons/ai'
import {BiLoader} from 'react-icons/bi'

type Profiles = Database['public']['Tables']['profiles']['Row']

const AvatarInput = ({
  uid,
  url,
  onUpload,
}: {
  uid: string
  url: Profiles['avatar_url']
  onUpload: (url: string) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
  const [uploading, setUploading] = useState(false)

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
        toast.error('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target?.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let {error: uploadError} = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      toast.error('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='flex flex-col sm:flex-row items-start gap-x-3'>
      <div
        className='
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

      <div className='flex'>
        <label
          className='flex items-center justify-center gap-x-2 bg-emerald-500 p-2 md:p-3 text-black font-bold rounded-full mt-2 hover:cursor-pointer hover:opacity-75 transition'
          htmlFor='single'
        >
          {uploading ? <BiLoader size={20} /> : <AiOutlineUpload size={20} />}
          {uploading ? <p>Uploading ...</p> : <p>Upload new avatar</p>}
        </label>

        <input
          className='hidden'
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}

export default AvatarInput
