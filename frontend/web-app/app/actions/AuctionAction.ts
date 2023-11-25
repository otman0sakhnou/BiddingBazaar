'use server'

import { Auction, pagedResult } from "@/types";

export async function getData(query:string): Promise<pagedResult<Auction>> {
  const res = await fetch(`http://localhost:6001/search${query}`);
  if (!res.ok) throw Error("Error fetching data ");
  return res.json();
}