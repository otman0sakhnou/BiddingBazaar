"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useParamsStor } from "../hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
export default function Search() {
  const router = useRouter();
  const pathname=usePathname();
  const setParams = useParamsStor((state) => state.setParams);
  const setSearchValue=useParamsStor(state=>state.setSearchValue);
  const searchValue = useParamsStor(state=>state.searchValue);

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }
  function search() {
    if(pathname!=='/') router.push('/');
    setParams({ searchTerm: searchValue });
  }

  return (
    <div className="flex w-full md:w-[50%] items-center rounded-full py-2 shadow-md border-gray-700">
      <input
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        value={searchValue}
        onChange={onChange}
        type="text"
        placeholder="Search for cars by make, model, or color"
        className="flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-600"
      />
      <button onClick={search}>
        <FaSearch
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
}
