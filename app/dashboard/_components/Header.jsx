"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
  const path = usePathname();
  // useEffect(()=>{
  //   console.log(path);
  // })
  return (
    <div className='flex p-4 items-center justify-between '>
        <Image src={'/logo.svg'} width={100} height={80} alt='logo' />
        <ul className='hidden md:flex gap-6 '>
          <li className={`hover:bg-red-500 p-2 cursor-pointer hover:rounded-lg ${path=='/dashboard' && 'bg-red-500 rounded-lg'}` }>Dashboard</li>
          <li className={`hover:bg-amber-300 p-2 cursor-pointer hover:rounded-lg ${path=='/dashboard/questions' && 'bg-amber-300 rounded-lg'}`}>Questions</li>
          <li className={`hover:bg-green-400 p-2 cursor-pointer hover:rounded-lg ${path=='/dashboard/upgrade' && 'bg-green-400 rounded-lg'}`}>Upgrade</li>
          <li className={`hover:bg-indigo-400 p-2 cursor-pointer hover:rounded-lg ${path=='/dashboard/how' && 'bg-indigo-400 rounded-lg'}`}>How it Works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
