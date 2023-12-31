/*
import {useEffect, useState, createContext, useContext} from 'react'
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
  Session,
} from '@supabase/auth-helpers-react'

import {ProfileDetails} from '@/types'

type ProfileContextType = {
  session: Session | null
  accessToken: string | null
  profile: User | null
  profileDetails: ProfileDetails | null
  isLoading: boolean
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
)

export interface Props {
  [propName: string]: any
}

export const MyProfileContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext()
  const profile = useSupaUser()
  const accessToken = session?.access_token ?? null
  const [isLoadingData, setIsloadingData] = useState(false)
  const [profileDetails, setProfileDetails] = useState<ProfileDetails | null>(
    null
  )

  const getProfileDetails = async () =>
    await supabase.from('profiles').select('*').single()

  useEffect(() => {
    if (profile && !isLoadingData && !profileDetails) {
      setIsloadingData(true)
      Promise.allSettled([getProfileDetails()]).then((results) => {
        const profileDetailsPromise = results[0]
        console.log(profileDetailsPromise)

        if (profileDetailsPromise.status === 'fulfilled')
          setProfileDetails(profileDetailsPromise.value.data as ProfileDetails)

        setIsloadingData(false)
      })
    } else if (!profile && !isLoadingUser && !isLoadingData) {
      setProfileDetails(null)
    }
  }, [profile, isLoadingUser])

  const value = {
    session,
    accessToken,
    profile,
    profileDetails,
    isLoading: isLoadingUser || isLoadingData,
  }
  console.log(profileDetails)

  return <ProfileContext.Provider value={value} {...props} />
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error(`useProfile must be used within a MyProfileContextProvider.`)
  }
  return context
}*/

import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
  Session
} from '@supabase/auth-helpers-react';

import { ProfileDetails } from '@/types';

type UserContextType = {
  session: Session | null
  accessToken: string | null;
  user: User | null;
  userDetails: ProfileDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<ProfileDetails | null>(null);

  const getUserDetails = async () => await supabase.from('profiles').select('*').single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails()]).then(
        (results) => {
          const userDetailsPromise = results[0];

          if (userDetailsPromise.status === 'fulfilled')
            setUserDetails(userDetailsPromise.value.data as ProfileDetails);

          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    session,
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useProfile = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
