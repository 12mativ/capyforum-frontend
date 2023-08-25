'use client'

import React, {useEffect, useState} from 'react'
import PostItem from '@/components/PostItem'
import ProfileMenu from '@/components/ProfileMenu'
import {useRouter} from 'next/navigation'
import ProfileData from '@/components/ProfileData'
import {getProfilePosts, PostData} from '@/api/posts'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {useProfile} from '@/hooks/useProfile'
import toast from 'react-hot-toast'
import IsLoading from '@/components/IsLoading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Profile = () => {
  const router = useRouter()

  const supabase = createClientComponentClient()
  const {user} = useProfile()

  const [posts, setPosts] = useState<PostData[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPostsChanged, setIsPostsChanged] = useState<boolean>(false)

  const fetchMoreData = async () => {
    let newPosts: PostData[]
    await getProfilePosts(supabase, user, page + 1, pageSize)
      .then((res) => {
        newPosts = res
      })
      .catch((err) => {
        toast.error(err)
      })
    if (newPosts?.length === 0) {
      setHasMore(false)
    } else {
      setPosts((prevState) => [...prevState, ...newPosts])
      setPage((prevState) => prevState + 1)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (user) {
      getProfilePosts(supabase, user, 1, pageSize)
        .then((res) => {
          if (res) {
            setPosts(res)
          }
        })
        .catch((err) => {
          toast.error(err.toString())
        })
        .finally(() => setIsLoading(false))
    }
  }, [user, isPostsChanged])

  useEffect(() => {
    router.push('/profile')
  }, [])

  return (
    <div className='flex gap-x-2 justify-between h-full scroll-y-auto'>
      <ProfileMenu />
      <div className='flex flex-col gap-y-2 h-full w-full'>
        <ProfileData />
        <div className='bg-neutral-400 bg-opacity-40 text-xl p-3 mt-3 rounded-lg'>
          <p>Your capyposts</p>
        </div>
        {isLoading ? (
          <IsLoading />
        ) : posts?.length !== 0 ? (
          <InfiniteScroll
            dataLength={posts ? posts.length : 0}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<IsLoading />}
            className='flex flex-col gap-y-2 h-full w-full'
          >
            {posts?.map((post) => {
              return (
                <PostItem
                  isProfilePostItem
                  key={post.id}
                  setIsPostsChanged={setIsPostsChanged}
                  post={post}
                />
              )
            })}
          </InfiniteScroll>
        ) : (
          <p>You have no posts :(</p>
        )}
        {/*{posts?.length !== 0 ? (
          posts?.map((post) => {
            return (
              <PostItem
                isProfilePostItem
                key={post.id}
                setIsPostsChanged={setIsPostsChanged}
                post={post}
              />
            )
          })
        ) : (
          <p>You have no posts :(</p>
        )}*/}
      </div>
    </div>
  )
}

export default Profile
