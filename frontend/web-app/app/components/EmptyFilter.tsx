import React from 'react'
import { useParamsStor } from '../hooks/useParamsStore'
import Heading from './Heading'
import { Button } from 'flowbite-react'

type Props={
  title?:string
  subtitle?:string
  showReset?:boolean
}

export default function EmptyFilter({title='No matches for this filter',subtitle='Try changing or reseting for the filter',showReset}:Props) {
  const reset = useParamsStor(state=>state.reset);

  return (
    <div className='h-[40vw] flex flex-col gap-2 justify-center items-center shadow-lg'>
      <Heading title={title} subtitle={subtitle} center/>
        <div className='mt-4'>
          {showReset &&(
            <Button onClick={reset} outline>
              Remove Filters
            </Button>
          )}
        </div>
     </div>
  )
}
