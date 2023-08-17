import React from 'react'
import avatar from '@/images/1.png'
import Link from 'next/link'
import {twMerge} from 'tailwind-merge'
import Button from '@/components/Button'
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

interface PostItemProps {
  isProfilePostItem?: boolean
}

const PostItem: React.FC<PostItemProps> = ({isProfilePostItem}) => {
  return (
    <div
      className={twMerge(
        `
          flex
          flex-col
          gap-y-3
          text-neutral-300
          bg-neutral-400
          bg-opacity-20
          p-3
          rounded-lg
        `,
        !isProfilePostItem! && 'w-full md:w-[70%]'
      )}
    >
      <div className='flex gap-y-2 md:flex-row flex-col justify-between'>
        <div className='flex gap-x-2'>
          <img
            src={avatar.src}
            alt='user_avatar'
            className='w-[70px] rounded-lg'
          />
          <p className='text-xl font-semibold'>mmattiivv</p>
        </div>
        <span className='text-emerald-500'>12/07/2023 - 13:35</span>
      </div>
      <p
        className='
            line-clamp-5
            md:line-clamp-10
            text-md
            font-medium
          '
      >
        <span className='block text-xl font-bold mb-2'>
          Capybara is a hero!
        </span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
        facilis quae vel voluptate. Blanditiis deleniti deserunt explicabo
        laborum sint totam. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Ducimus facilis quae vel voluptate. Blanditiis deleniti deserunt
        explicabo laborum sint totam. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Ducimus facilis quae vel voluptate. Blanditiis
        deleniti deserunt explicabo Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Ducimus facilis quae vel voluptate. Blanditiis
        deleniti deserunt explicabo laborum sint totam. Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Ducimus facilis quae vel voluptate.
        Blanditiis deleniti deserunt explicabo laborum sint totam. Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Ducimus facilis quae vel
        voluptate. Blanditiis deleniti deserunt explicabo
      </p>
      <div className='flex flex-col sm:flex-row justify-between items-start gap-y-4 sm:gap-y-0 sm:items-end'>
        <div className='flex flex-col gap-y-4'>
          <Link
            href='/'
            className='
              text-emerald-500
              font-md
              underline
            '
          >
            See full capypost
          </Link>
          <Button className={twMerge(`
            p-2
          `, !isProfilePostItem! && 'hidden'
          )}>
            <Link
              href='/'
              className='
                flex
                gap-x-2
                font-md
              '
            >
              <AiFillEdit size={20} />
              <p>Edit capypost</p>
            </Link>
          </Button>
        </div>
        <Button className={twMerge(`
          p-2 
          w-fit 
          h-fit 
          bg-red-900 
          text-neutral-100
        `, !isProfilePostItem! && 'hidden'
        )}>
          <Link
            href='/'
            className='
                flex
                gap-x-2
                font-md
              '
          >
            <AiFillDelete size={20} />
            <p>Delete capypost</p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default PostItem
