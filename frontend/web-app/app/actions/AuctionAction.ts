'use server'
import { FieldValues } from 'react-hook-form';
import { Auction, pagedResult } from "@/types";
import { getTockenWorkaround } from "./authActions";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { revalidatePath } from 'next/cache';
import toast from 'react-hot-toast';

export async function getData(query:string): Promise<pagedResult<Auction>> {
  return await fetchWrapper.get(`search${query}`)
}

export async function updateAuctionTest(){
  const data={
      mileage : Math.floor(Math.random()*1000)+1
  }
 return await fetchWrapper.put('auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654',data);
}


export async function createAuction(data: FieldValues){
  return await fetchWrapper.post('auctions',data)
}

export async function getDetailViewData(id:string): Promise<Auction>{
  return await fetchWrapper.get(`auctions/${id}`)
}

export async function updateAuction(data:FieldValues,id:string){  
  const res = await fetchWrapper.put(`auctions/${id}`,data);
  if(res.ok) {
    toast.success("updated successefly")
  }
  revalidatePath(`/auctions/${id}`);
  return res;
}

export async function deleteAuction(id:string){
const res = await fetchWrapper.del(`auctions/${id}`);
  if(res.ok) {
    toast.success("deleted successefly")
  }
 return res;
}