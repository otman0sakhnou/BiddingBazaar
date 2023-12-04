'use client'
import { Dropdown } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import {HiCog, HiUser} from 'react-icons/hi2'
import { useParamsStor } from '../hooks/useParamsStore'

type Props={
  user:User
}

export default function UserActions({user}:Props) {

  const router= useRouter();
  const pathname=usePathname();
  const setParams=useParamsStor(state=>state.setParams)

  function setWinener(){
    setParams({winner:user.username,seller:undefined})
    if(pathname!==('/')) router.push('/')
  }
  function setSeller(){
    setParams({seller:user.username,winner:undefined})
    if(pathname!==('/')) router.push('/')
  }


  return (
    <Dropdown label={`Welcome ${user.name}`} inline>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
          My Auctions
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWinener}>
          Auctions Won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href='/auctions/create'>
         Sell my car
        </Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href='/session'>
          session (dev only)
        </Link>
      </Dropdown.Item>
      <Dropdown.Divider/>
      <Dropdown.Item onClick={()=>signOut({callbackUrl:'/'})} icon={AiOutlineLogout}>
          Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}
