import { Button } from 'flowbite-react';
import React from 'react'
import { useParamsStor } from '../hooks/useParamsStore';
import {AiOutlineClockCircle, AiOutlineSortAscending} from 'react-icons/ai'
import {BsFillStopCircleFill, BsStopwatch, BsStopwatchFill} from 'react-icons/bs'
import {GiFinishLine, GiFlame} from 'react-icons/gi'

type Props={
   pageSize: number;
   setPageSize:(size : number)=> void;
}
const pageSizeButtons =[4,8,12];

const orderButtons=[
  {
    label:'Alphabetical',
    icon:AiOutlineSortAscending,
    value:'make'
  },
  {
    label:'End date',
    icon:AiOutlineClockCircle,
    value:'endingSoon'
  },
  {
    label:'Recentlu added',
    icon:BsFillStopCircleFill,
    value:'new'
  }
]
const filterButtons=[
  {
    label:'Live Auction',
    icon:GiFlame,
    value:'live'
  },
  {
    label:'Ending < 2 hours',
    icon:GiFinishLine,
    value:'endingSoon'
  },
  {
    label:'Completed',
    icon:BsStopwatchFill,
    value:'finished'
  }
]

export default function Filters() {

  const pageSize =useParamsStor(state=>state.pageSize);
  const setParams =useParamsStor(state=>state.setParams);
  const orderby = useParamsStor(state=>state.orderBy);
  const filterBy = useParamsStor(state=>state.orderBy);

  
  return (
    <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
  <div className="mb-4 md:mb-0 md:mr-4">
    <span className='uppercase text-sm text-gray-500 mr-2'>Filter By</span>
    <Button.Group>
      {filterButtons.map(({ label, icon: Icon, value }) => (
        <Button
          key={value}
          onClick={() => setParams({ filterBy: value })}
          color={`${filterBy === value ? 'red' : 'gray'}`}
        >
          <Icon className='mr-3 h-4 w-4' />
          {label}
        </Button>
      ))}
    </Button.Group>
  </div>

  <div className="mb-4 md:mb-0 md:mr-4">
    <span className='uppercase text-sm text-gray-500 mr-2'>Order By</span>
    <Button.Group>
      {orderButtons.map(({ label, icon: Icon, value }) => (
        <Button
          key={value}
          onClick={() => setParams({ orderBy: value })}
          color={`${orderby === value ? 'red' : 'gray'}`}
        >
          <Icon className='mr-3 h-4 w-4' />
          {label}
        </Button>
      ))}
    </Button.Group>
  </div>

  <div>
    <span className='uppercase text-sm text-gray-500 mr-2'>Page Size</span>
    <Button.Group>
      {pageSizeButtons.map((value, i) => (
        <Button
          key={i}
          onClick={() => setParams({ pageSize: value })}
          color={`${pageSize === value ? 'red' : 'gray'}`}
          className='focus:ring-0'
        >
          {value}
        </Button>
      ))}
    </Button.Group>
  </div>
</div>

  )
}
