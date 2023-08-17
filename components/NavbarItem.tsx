import React from 'react'
import {IconType} from 'react-icons'
import Link from "next/link";

export interface NavbarItemProps {
  icon: IconType
  label: string
  href: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({icon: Icon, label, href}) => {
  return (
    <Link href={href} className='
      flex
      gap-x-2
      items-center
      py-2
      px-3
      text-lg
      font-semibold
      border-2
      border-transparent
      rounded-xl
      hover:border-white
      transition
    '>
      <Icon size={26}/>
      {label}
    </Link>
  )
}

export default NavbarItem