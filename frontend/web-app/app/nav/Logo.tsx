'use client'
import React from 'react'
import { IoCarSportOutline } from 'react-icons/io5'
import { useParamsStor } from '../hooks/useParamsStore'

export default function Logo() {
  const reset= useParamsStor(state=>state.reset);
  return (
    <div onClick={reset} className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500">
        <IoCarSportOutline size={35} />
        <div>BiddingBazaar Auctions</div>
      </div>
  )
}
