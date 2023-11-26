'use server'

import { Auction, pagedResult } from "@/types";
import { getTockenWorkaround } from "./authActions";

export async function getData(query:string): Promise<pagedResult<Auction>> {
  const res = await fetch(`http://localhost:6001/search${query}`);
  if (!res.ok) throw Error("Error fetching data ");
  return res.json();
}

export async function UpdateAuctionTest(){
  const data={
      mileage : Math.floor(Math.random()*1000)+1
  }
  const token =await getTockenWorkaround();
  const res=await fetch('http://localhost:6001/auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654',{
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token?.access_token
    },
    body:JSON.stringify(data)
  })
  if (!res.ok) return{status:res.status,message:res.statusText}
  return res.statusText;
}
