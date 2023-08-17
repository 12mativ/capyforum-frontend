'use client'

import React from 'react'

import {MyProfileContextProvider} from '@/hooks/useProfile'

interface UserProviderProps {
  children: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  return (
    <MyProfileContextProvider>
      {children}
    </MyProfileContextProvider>
  )
}

export default UserProvider
