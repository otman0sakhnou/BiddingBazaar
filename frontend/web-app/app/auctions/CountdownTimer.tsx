"use client";
import { Span } from "next/dist/trace";
import { space } from "postcss/lib/list";
import React from "react";
import Countdown, { zeroPad } from "react-countdown";

type Props = {
  auctionEnd: string;
};

const renderer = ({days,hours,minutes,seconds,completed,}:{days: number;hours: number;minutes: number;seconds: number;completed: boolean;
}) => {
  return (
    <div
      className={`border-2 border-white text-white py-1 px2 flex justify-center rounded-lg  
      ${
        completed
          ? "bg-red-600"
          : days === 0 && hours < 10
          ? "bg-amber-600"
          : "bg-green-600"
      }`}
    >
      {completed ? (
        <span>Auction finished</span>
      ) : (
        <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
    </div>
  );
};

export default function CountdownTimer({ auctionEnd }: Props) {
  return (
    <div>
      <Countdown date={auctionEnd} renderer={renderer} />
    </div>
  );
}
