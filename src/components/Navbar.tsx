import { useState } from "react";
import Logo from "../images/Flipkart-logo.png";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [search, setSearch] = useState("");

  console.log("The Search Value : ", search);

  return (
    <div className="w-full flex flex-row mt-4 ">
      {/* This is for the Flip logo and Search Section */}
      <div className="w-3/5 flex space-x-6 ">
        <img src={Logo} className="w-40 h-20 ml-4" />
        <div className="relative w-full flex border-4 border-gray-200 ">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 pl-12 text-xl border-none focus:outline-none"
          />

          <CiSearch className="absolute top-6 left-4 text-2xl" />
        </div>
      </div>

      {/* This is for the Sidebar section  */}
      <div className="w-2/5 flex flex-row justify-around items-center">
        <div className="flex space-x-1 cursor-pointer text-2xl">
          <CiUser className="mt-1" />
          <span>Login</span>
        </div>
        <div className="flex space-x-1 cursor-pointer text-2xl">
          <IoCartOutline className="mt-1" />
          <span>Cart </span>
        </div>
        <div className="flex space-x-1 cursor-pointer text-2xl">
          <AiOutlineHome className="mt-1" />
          <span>Become a Seller</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
