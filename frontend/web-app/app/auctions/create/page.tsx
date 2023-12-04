import Heading from '@/app/components/Heading'
import React from 'react'
import AuctionForm from '../AuctionForm'

export default function Create() {
  return (
    <div className='mx-auto max-w-[75%] shadow-lg bg-white p-10 rounded-lg '>
      <Heading title="Sell your Car !" subtitle="Please Enter your Car details"/>
      <AuctionForm/>
    </div>
  )
}
