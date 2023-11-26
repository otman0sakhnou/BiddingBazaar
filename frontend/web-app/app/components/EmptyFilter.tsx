'use client'
import React from 'react'
import { useParamsStor } from '../hooks/useParamsStore'
import Heading from './Heading'
import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react'

type Props={
  title?:string
  subtitle?:string
  showReset?:boolean
  showLogin?:boolean
  callbackUrl?:string
}

export default function EmptyFilter({title='No matches for this filter',subtitle='Try changing or reseting for the filter',showReset,showLogin,callbackUrl}:Props) {
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
          {
            showLogin &&(
              <Button onClick={()=>signIn('id-server',{callbackUrl})} outline>
              Login
            </Button>
            )
          }
        </div>
     </div>
  )
}
