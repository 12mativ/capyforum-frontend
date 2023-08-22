import React from 'react'
import {AiOutlineHome, AiOutlinePlus} from 'react-icons/ai'
import {MdOutlineDescription} from 'react-icons/md'
import {IoSettingsOutline} from 'react-icons/io5'
import Link from 'next/link'

const BottomMenu = () => {
  return (
    <div
      className='
        fixed
        bottom-0
        md:hidden
        flex
        justify-around
        w-full
        bg-emerald-900
        px-3
        py-1
        text-neutral-200
      '
    >
      <Link
        href={'/heap'}
        className='
        flex
        flex-col
        items-center
      '
      >
        <AiOutlineHome size={20} />
        <span className='text-sm'>Heap</span>
      </Link>
      <Link
        href={'/profile'}
        className='
        flex
        flex-col
        items-center
      '
      >
        <MdOutlineDescription size={20} />
        <span className='text-sm'>Profile</span>
      </Link>
      <Link
        href={'/profile/create-post'}
        className='
        flex
        flex-col
        items-center
      '
      >
        <AiOutlinePlus size={20} />
        <span className='text-sm'>Add post</span>
      </Link>
      <Link
        href={'/profile/edit'}
        className='
        flex
        flex-col
        items-center
      '
      >
        <IoSettingsOutline size={20} />
        <span className='text-sm'>Settings</span>
      </Link>
    </div>
  )
}

export default BottomMenu
