'use client'
import { deleteAuction } from '@/app/actions/AuctionAction'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast'


type Props={
  id:string
}

export default function DeleteButton({id}:Props) {
  const [Loading,setLoading]=useState(false);
  const router=useRouter();


  const handleDelete =()=>{
    confirmAlert({
      title:'Confirm Delete',
      message:'Are you sure you want to delete',
      buttons:[
        {
          label:'Yes',
          onClick:()=>{
              setLoading(true); 
              deleteAuction(id)
                .then(res=>{
                  if(res.error) throw res.error
                  router.push('/');
                  toast.success("Deleted Success")
                  }).catch(error=>{
                  toast.error(error.status + ' ' + error.message)
                 }).finally(()=>setLoading(false))
          }
        },{
          label:'No'
        }
      ]
    })
  }
  return (
    <Button color='failure'  isProcessing={Loading} onClick={handleDelete}>
      Delete Auction
    </Button>
  )
}
