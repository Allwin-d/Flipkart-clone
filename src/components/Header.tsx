import { IoSearchOutline, IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import FlipkartLogo from "../images/Flipkart-logo.png";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  return (
    <div className="h-20 w-full p-4 bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img
          src={FlipkartLogo}
          alt="Logo"
          width={90}
          height={90}
          className="cursor-pointer"
        />

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded w-80 px-2 bg-white">
          <IoSearchOutline className="text-gray-500 mr-2 hover:cursor-pointer bg-gray-100" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            onChange={handleChange}
            value={search}
            className="w-full outline-none p-2 bg-gray-100"
          />
        </div>

        {/* Right Icons */}
        <div className="flex space-x-36 items-center text-xl">
          <div className="flex items-center space-x-1">
            <FaUserCircle />
            <span className="cursor-pointer">Login</span>
          </div>
          <div className="flex items-center space-x-1">
            <BsCart3 />
            <span className="cursor-pointer">Cart</span>
          </div>
          <div className="flex items-center space-x-1">
            <IoHomeOutline />
            <span className="cursor-pointer">Become a Seller</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
