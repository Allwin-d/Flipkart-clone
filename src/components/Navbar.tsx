import React, { useEffect, useState } from "react";
import Logo from "../images/Flipkart-logo.png";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../Hooks/useDebounce";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const value = useDebounce(search, 500);

  const navigate = useNavigate();
  const location = useLocation();
  const productlength = useSelector((state: RootState) => state.cart);

  const handleLogo = () => {
    setSearch(""); // Clear search when going home
    navigate("/");
  };

  const handleCart = () => {
    setSearch("")
    navigate("/cart");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Clear search when navigating away from products page
  useEffect(() => {
    if (location.pathname !== "/products") {
      setSearch("");
    }
  }, [location.pathname]);

  useEffect(() => {
    // Only navigate if there's a value AND we're on the products page or need to go there
    if (value && location.pathname === "/products") {
      const currentSearch = new URLSearchParams(location.search).get("search");
      if (currentSearch !== value) {
        navigate(`/products?search=${value}`, { replace: true });
      }
    } else if (value && location.pathname !== "/products") {
      // Only navigate to products if user is actively searching (not just residual state)
      navigate(`/products?search=${value}`);
    }
  }, [value, location.search, location.pathname, navigate]); // Remove location and navigate from dependencies

  return (
    <div className="w-full flex flex-row fixed top-0 z-50 bg-white shadow-md h-20 items-center">
      {/* Logo and Search Section */}
      <div className="w-3/5 flex space-x-6">
        <img
          onClick={handleLogo}
          src={Logo}
          alt="Flipkart Logo"
          className="w-40 h-20 ml-4 cursor-pointer"
        />
        <div className="relative w-full flex border-4 border-gray-200">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            placeholder="Search for products..."
            className="w-full bg-gray-50 pl-12 text-xl border-none focus:outline-none"
          />
          <CiSearch className="absolute top-6 left-4 text-2xl text-gray-500" />
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="w-2/5 flex flex-row justify-around items-center">
        <div className="flex space-x-1 cursor-pointer text-2xl hover:text-blue-600 transition-colors">
          <CiUser className="mt-1" />
          <span>Login</span>
        </div>
        <div
          className="flex space-x-1 cursor-pointer text-2xl hover:text-blue-600 transition-colors"
          onClick={handleCart}
        >
          <IoCartOutline className="mt-1" />
          <span>
            Cart<span className="ml-2">{productlength.length}</span>
          </span>
        </div>
        <div className="flex space-x-1 cursor-pointer text-2xl hover:text-blue-600 transition-colors">
          <AiOutlineHome className="mt-1" />
          <span>Become a Seller</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
