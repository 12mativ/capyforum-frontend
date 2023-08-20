'use client'
import {useEffect, useState} from 'react'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import getProfileData from '@/api/profile'
import {useProfile} from '@/hooks/useProfile'
import Input from '@/components/Input'
import Button from '@/components/Button'
import toast from "react-hot-toast";
import AvatarInput from "@/components/AvatarInput";
import Link from "next/link";
import {AiOutlineArrowLeft} from "react-icons/ai";

export default function Edit() {
  const supabase = createClientComponentClient()
  const {user, session} = useProfile()
  const [loading, setLoading] = useState<boolean>(true)
  const [fullName, setFullName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  async function updateProfile({
    fullname,
    username,
    website,
    avatarUrl,
  }: {
    fullname: string | null
    username: string | null
    website: string | null
    avatarUrl: string | null
  }) {
    try {
      setLoading(true)

      let {error} = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfileData(supabase, session, user)
      .then((res) => {
        if (res) {
          setFullName(res.full_name)
          setUsername(res.username)
          setWebsite(res.website)
          setAvatarUrl(res.avatar_url)
        }
      })
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col gap-y-4 h-full w-full md:w-[80%]'>

        <Link href={'/profile'}>
          <Button className='flex items-center justify-center gap-x-2 w-fit bg-neutral-200 text-emerald-500 font-bold'>
            <AiOutlineArrowLeft size={20} />
            <p>Back to profile</p>
          </Button>
        </Link>

        <AvatarInput
          uid={user?.id || ''}
          url={avatarUrl}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({fullname: fullName, username, website, avatarUrl: url})
          }}
        />

        <div>
          <label htmlFor='email'>Email</label>
          <Input id='email' type='email' value={session?.user.email || ''} disabled />
        </div>

        <div>
          <label htmlFor='username'>Username</label>
          <Input
            id='username'
            type='text'
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='fullname'>Full name</label>
          <Input
            id='fullname'
            type='text'
            value={fullName || ''}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='website'>Website</label>
          <Input
            id='website'
            type='url'
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className='flex w-full justify-center mt-3'>
          <Button
            className='w-[50%] lg:w-[20%] md:w-[30%]'
            onClick={() => updateProfile({fullname: fullName, username, website, avatarUrl})}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update profile'}
          </Button>
        </div>

      </div>
    </div>
  )
}
