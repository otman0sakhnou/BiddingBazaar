import React from 'react'
import { getSession, getTockenWorkaround } from '../actions/authActions'
import Heading from '../components/Heading';
import AuthTest from './AuthTest';

export default async function session() {
  const session= await getSession();
  const tocken = await getTockenWorkaround();
  return (
    <div>
      <Heading title='Session dashboord'/>
      <div className='bg-blue-200 border-2 border-blue-600 mb-5 p-4 '>
        <h3 className='text-lg'>Session Data</h3>
        <pre>{JSON.stringify(session,null,2)}</pre>
      </div>
      <div>
        <AuthTest/>
      </div>
      <div className='bg-green-200 border-2 border-blue-600 mt-5 p-4'>
        <h3 className='text-lg'>Tocken Data</h3>
        <pre className='overflow-auto'>{JSON.stringify(tocken,null,2)}</pre>
      </div>
    </div>
  )
}
