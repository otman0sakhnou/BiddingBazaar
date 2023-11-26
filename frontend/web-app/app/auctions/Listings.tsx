"use client";

import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { Auction, pagedResult } from "@/types";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/AuctionAction";
import Filters from "./Filters";
import { useParamsStor } from "../hooks/useParamsStore";
import { shallow } from "zustand/shallow";
import qs from "query-string";
import EmptyFilter from "../components/EmptyFilter";

export default function Listings() {
  const [data, setData] = useState<pagedResult<Auction>>();
  const params = useParamsStor(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderby: state.orderBy,
      filterby: state.filterBy,
    }),
    shallow
  );

  const setParams = useParamsStor((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });
  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h2>Loading ...</h2>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.results.map((auction) => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              pageChanged={setPageNumber}
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  );
}
