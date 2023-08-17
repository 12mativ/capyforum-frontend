'use client'

import {useEffect, useState} from 'react'

import UsernameModal from '@/components/UsernameModal'
import {useProfile} from '@/hooks/useProfile'
import {Database} from '@/db_types'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import toast from "react-hot-toast";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const {session} = useProfile()
  const supabase = createClientComponentClient<Database>()
  const user = session?.user

  async function updateProfile({username}: {username: string | null}) {
    try {
      setLoading(true)

      let {error} = await supabase.from('profiles').upsert({
        id: user?.id as string,
        username,
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
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <UsernameModal loading={loading} updateProfile={updateProfile}/>
    </>
  )
}

export default ModalProvider
