'use client'
import React from 'react'
import { IoCarSportOutline } from 'react-icons/io5'
import { useParamsStor } from '../hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter();
  const pathname=usePathname();
  const reset= useParamsStor(state=>state.reset);


  function doReset(){
    if(pathname!=='/') router.push('/')
    reset();
  }

  return (
    <div onClick={doReset} className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500">
        <IoCarSportOutline size={35} />
        <div>BiddingBazaar Auctions</div>
      </div>
  )
}
