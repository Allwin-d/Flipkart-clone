import React, { useEffect, useState } from "react";
import Logo from "../images/Flipkart-logo.png";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "../Hooks/useDebounce";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_SEARCH_PRODUCT;
  const value = useDebounce(search, 500); //the hooks should always be used at the top level

  const navigate = useNavigate();

  const handleLogo = () => {
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
      if (!value) return;

      try {
        const response = await axios.get(`${API_URL}${value}`);
        const products = response.data.products;

        if (products && products.length > 0) {
          navigate("/products", {
            state: products, //this is where we are sending the products value , using the useNavigate , inside the object
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [value, API_URL, navigate]);

  return (
    <div className="w-full flex flex-row mt-4 ">
      {/* This is for the Flip logo and Search Section */}
      <div className="w-3/5 flex space-x-6 ">
        <img
          onClick={handleLogo}
          src={Logo}
          className="w-40 h-20 ml-4 cursor-pointer"
        />
        <div className="relative w-full flex border-4 border-gray-200 ">
          <input
            type="text"
            onChange={handleSearch}
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
        <div
          className="flex space-x-1 cursor-pointer text-2xl"
          onClick={handleCart}
        >
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
