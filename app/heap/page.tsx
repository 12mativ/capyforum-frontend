'use client'

import PostItem from '@/components/PostItem'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {getHeapPosts, getProfilePosts, PostData} from '@/api/posts'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import IsLoading from '@/components/IsLoading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Heap = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPostsChanged, setIsPostsChanged] = useState<boolean>(false)

  const supabase = createClientComponentClient()
  const router = useRouter()

  const fetchMoreData = async () => {
    let newPosts = [] as PostData[]
    await getHeapPosts(supabase, page + 1, pageSize)
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
    getHeapPosts(supabase, 1, pageSize)
      .then((res) => {
        if (res) {
          setPosts(res)
        }
      })
      .catch((err) => {
        toast.error(err.toString())
      })
      .finally(() => setIsLoading(false))
  }, [isPostsChanged])

  useEffect(() => {
    router.refresh()
    router.push('/heap')
  }, [])

  return isLoading ? (
    <IsLoading />
  ) : posts?.length !== 0 ? (
    <InfiniteScroll
      dataLength={posts ? posts.length : 0}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<IsLoading />}
      className='flex flex-col gap-y-3 items-center'
    >
      {posts?.map((post) => (
        <PostItem
          key={post.id}
          setIsPostsChanged={setIsPostsChanged}
          post={post}
        />
      ))}
    </InfiniteScroll>
  ) : (
    <p>No post here :(</p>
  )
}

export default Heap
