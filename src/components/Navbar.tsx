import React, { useEffect, useState } from "react";
import Logo from "../images/Flipkart-logo.png";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "../Hooks/useDebounce";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_SEARCH_PRODUCT;
  const value = useDebounce(search, 500);

  const navigate = useNavigate();
  const location = useLocation();
  const productlength = useSelector((state: RootState) => state.cart);

  const handleLogo = () => {
    setSearch(""); // Clear search when going home
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      // Only proceed if there's a search value
      if (value.trim() === "") return;

      // Only trigger search navigation from home page or products page
      // This prevents unwanted redirects from other pages
      if (location.pathname !== "/" && location.pathname !== "/products") {
        return;
      }

      try {
        const response = await axios.get(`${API_URL}${value}`);
        const products = response.data.products;

        navigate("/products", {
          state: products ? products : [],
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [value, API_URL, navigate, location.pathname]);

  return (
    <div className="w-full flex flex-row mt-4">
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
          <span>Cart<span className="ml-2">{productlength.length}</span></span>
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
