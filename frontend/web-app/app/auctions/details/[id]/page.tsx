import { getDetailViewData } from '@/app/actions/AuctionAction'
import Heading from '@/app/components/Heading';
import React from 'react'
import CountdownTimer from '../../CountdownTimer';
import CarImage from '../../CarImage';
import DetailSpecs from './DetailSpecs';
import { getCurrentUser } from '@/app/actions/authActions';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

export default async function Details({params}:{params:{id:string}}) {
  const data = await getDetailViewData(params.id);
  const user = await getCurrentUser();

  return (
    <div>
      <div className='flex justify-between' >
          <div className='flex items-center gap-4'>
          <Heading title={`${data.make} ${data.model}`}/>
          {user?.username===data.seller && (
            <>
              <EditButton id={data.id}/> 
              <DeleteButton id={data.id}/>
            </>  
          )}
          </div>
          <div className='flex gap-3'>
            <h3 className='text-2xl font-semibold'>Time Remaining</h3>
            <CountdownTimer auctionEnd={`${data.auctionEnd}`}/>
          </div>
      </div>
      <div className='grid grid-cols-2 gap-6 mt-3'>
          <div className='w-full bg-grat-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden'> 
              <CarImage imageUrl={`${data.imageUrl}`}/>
          </div>
          <div className='border-2 rounded-lg p-2 bg-gray-100'>
              <Heading title='Bids here' />
          </div>
      </div>
      <div className='mt-3 grid grid-cols-1 rounded-lg'>
        <DetailSpecs auction={data}/>
      </div>
    </div>
  )
}
