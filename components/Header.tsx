'use client'

import React, {useEffect, useMemo} from 'react'
import {AiOutlineHome, AiOutlineLaptop} from 'react-icons/ai'
import {MdOutlineDescription} from 'react-icons/md'
import NavbarItem from '@/components/NavbarItem'
import Button from '@/components/Button'
import {CiLogout} from 'react-icons/ci'
import {BiLogOut} from 'react-icons/bi'
import BottomMenu from '@/components/BottomMenu'
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import {useProfile} from '@/hooks/useProfile'
import {usePathname, useRouter} from 'next/navigation'
import toast from 'react-hot-toast'

export interface HeaderProps {
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({children}) => {
  const {user, isLoading} = useProfile()

  const router = useRouter()
  const pathname = usePathname()

  const supabaseClient = useSupabaseClient()

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

  const links = useMemo(
    () => [
      {
        icon: AiOutlineHome,
        label: 'Heap',
        href: '/heap',
      },
      {
        icon: MdOutlineDescription,
        label: 'Profile',
        href: '/profile',
      },
    ],
    []
  )

  return (
    <>
      {user ? (
        <>
          <div
            className='
            flex
            items-center
            justify-between
            fixed
            top-0
            w-full
            p-2
            bg-emerald-900
            mb-4
            z-50
          '
          >
            <p className='py-3'>CapyLogo</p>
            <div className='flex items-center gap-x-4'>
              <nav className='hidden md:flex gap-x-4'>
                {links.map((link) => {
                  return <NavbarItem key={link.label} {...link} />
                })}
              </nav>
              <Button onClick={handleLogout}>
                <BiLogOut size={25} className='text-white' />
              </Button>
            </div>
          </div>
          <main className='md:h-full overflow-y-auto flex-1 p-2 pt-20 pb-16 md:pb-2'>
            {children}
          </main>
          <BottomMenu />
        </>
      ) : pathname === '/auth' || pathname === '/' ? (
        <main className='h-full overflow-y-auto flex-1 p-2'>
          {children}
        </main>
      ): !user && isLoading ? (
        <main className='h-full flex items-center justify-center overflow-y-auto flex-1 p-2 text-3xl'>
          Loading...
        </main>
      ) : (
        <main className='h-full flex items-center justify-center overflow-y-auto flex-1 p-2 text-3xl'>
          Goodbye!
        </main>
      )}
    </>
  )
}

export default Header
