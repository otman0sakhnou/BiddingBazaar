import React from "react";
import { IoCarSportOutline } from "react-icons/io5";
import Search from "./Search";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row justify-between bg-white p-5 items-center text-gray-800 shadow-md">
      <Logo  />
      <Search/>
      <div className="mt-4 sm:mt-0 sm:ml-4">
        Login
      </div>
    </header>
  );
}
