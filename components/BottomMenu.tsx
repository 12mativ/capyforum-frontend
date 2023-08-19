import React from 'react'
import {AiOutlineHome, AiOutlinePlus} from "react-icons/ai";
import {MdOutlineDescription} from "react-icons/md";
import {IoSettingsOutline} from "react-icons/io5";
import Link from "next/link";

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
        p-3
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
        <AiOutlineHome size={24} />
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
        <MdOutlineDescription size={24} />
        <span className='text-sm'>Profile</span>
      </Link>
      <div
        className='
        flex
        flex-col
        items-center
      '
      >
        <AiOutlinePlus size={24} />
        <span className='text-sm'>Add post</span>
      </div>
      <Link
        href={'/profile/edit'}
        className='
        flex
        flex-col
        items-center
      '
      >
        <IoSettingsOutline size={24} />
        <span className='text-sm'>Settings</span>
      </Link>
    </div>
  )
}

export default BottomMenu