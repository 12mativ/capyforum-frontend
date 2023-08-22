'use client'

import React, {useState} from 'react'
import {useProfile} from '@/hooks/useProfile'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {useRouter} from 'next/navigation'
import {createPost} from '@/api/posts'
import toast from 'react-hot-toast'
import Button from '@/components/Button'
import {FieldPath, SubmitHandler, useForm} from 'react-hook-form'
import Input from '@/components/Input'
import {AiOutlineArrowLeft} from "react-icons/ai";

interface FormValues {
  title: string
  content: string
}

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {user} = useProfile()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const {register, handleSubmit} = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true)
    if (user) {
      createPost(user.id, supabase, data.title, data.content)
        .then(() => {
          toast.success('Post has been made!')
          setIsLoading(false)
          router.push('/profile')
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }

  return (
    <>
      <Button
        className='flex items-center justify-center gap-x-2 w-fit bg-neutral-200 text-emerald-500 font-bold mb-4'
        onClick={() => router.back()}
      >
        <AiOutlineArrowLeft size={20} />
        <p>Back</p>
      </Button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col md:flex-row gap-y-3 md:gap-x-3 justify-center'
      >
        <p className='text-xl text-emerald-500 text-center md:text-left'>
          There you can create your perfect capypost!
        </p>
        <div className='flex flex-col items-center justify-center w-[100%] md:w-[60%] gap-y-3'>
          <Input
            id='title'
            disabled={isLoading}
            {...register('title' as FieldPath<FormValues>, {required: true})}
            placeholder='Post title'
          />

          <textarea
            placeholder='Post text'
            id='content'
            disabled={isLoading}
            {...register('content' as FieldPath<FormValues>, {required: true})}
            className='
            flex
            w-full
            rounded-md
            bg-neutral-700
            border
            border-transparent
            px-3
            py-3
            text-sm
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            placeholder:text-neutral-400
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none
          '
          />
          <Button type='submit' disabled={isLoading} className='w-[60%] md:w-[40%]'>
            Create new post
          </Button>
        </div>
      </form>
    </>

  )
}

export default CreatePost
