import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import UserActions from "./UserActions";
import { getCurrentUser } from "../actions/authActions";

export default async function NavBar() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row justify-between bg-white p-5 items-center text-gray-800 shadow-md">
      <Logo  />
      <Search/>
      {user ?(<UserActions user={user}/>):(<LoginButton/>)}
      
    </header>
  );
}
