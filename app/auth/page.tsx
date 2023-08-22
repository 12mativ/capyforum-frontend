'use client'

import React, {useEffect, useState} from 'react'

import {
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {useRouter} from "next/navigation";
import {useProfile} from "@/hooks/useProfile";

const AuthPage = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const {user, isLoading} = useProfile()
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    router.refresh()

  }, [user])

  if (user) {
    return
  }

  return (
    <div className='
      flex
      items-center
      justify-center
      w-full
      h-full
    '>
      {!isLoading ? (
        <div className='
        w-[100%]
        lg:w-[45%]
        sm:w-[80%]
        bg-emerald-900
        p-4
        rounded-xl
      '>
          <p className='text-center text-2xl'>Welcome to capyforum!</p>
          <Auth
            theme='dark'
            magicLink
            providers={['github']}
            supabaseClient={supabaseClient}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#404040',
                    brandAccent: '#1aa24c',
                  },
                },
              },
            }}
          />
        </div>
      ) : (<div className='text-3xl'>Loading...</div>)}

    </div>
  )
}

export default AuthPage