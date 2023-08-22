'use client'

import PostItem from '@/components/PostItem'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {getAllPosts, PostData} from '@/api/posts'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'

const Heap = () => {
  const [posts, setPosts] = useState<PostData[] | null>(null)
  const [isPostsChanged, setIsPostsChanged] = useState<boolean>(false)

  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    router.refresh()
    router.push('/heap')

    getAllPosts(supabase)
      .then((res) => {
        if (res) {
          setPosts(res)
        }
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [isPostsChanged])

  return (
    <div
      className='
      flex
      flex-col
      gap-y-3
      items-center
    '
    >
      {posts?.length !== 0 ? posts?.map((post) => {
        return <PostItem key={post.id} setIsPostsChanged={setIsPostsChanged} post={post} />
      }) : <p>No post here :(</p>}
    </div>
  )
}

export default Heap
