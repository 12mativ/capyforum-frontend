'use client'

import PostItem from "@/components/PostItem";
import {useEffect} from "react";
import {useProfile} from "@/hooks/useProfile";
import {useRouter} from "next/navigation";

export default function Heap() {
  const router = useRouter()

  useEffect(() => {
    router.refresh()
    router.push('/heap')
  }, [])

  return (
    <div
      className='
      flex
      flex-col
      items-center
    '
    >
      <PostItem />
    </div>
  )
}