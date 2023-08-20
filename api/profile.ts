import {Session, SupabaseClient, User} from '@supabase/supabase-js'

export interface GetProfileData {
  full_name: string | null
  username: string | null
  website: string | null
  avatar_url: string | null
}

const getProfileData = async (
  supabase: SupabaseClient | null,
  session: Session | null,
  user: User | null
): Promise<GetProfileData | null> => {
  if (supabase) {
    const {data, error, status} = await supabase
      .from('profiles')
      .select(`full_name, username, website, avatar_url`)
      .eq('id', user?.id)
      .single()

    if (error && status !== 406) {
      throw error
    }

    return (data as any) || null
  }

  return null
}

export default getProfileData
