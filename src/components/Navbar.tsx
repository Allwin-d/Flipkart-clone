import { useState } from "react";
import Logo from "../images/Flipkart-logo.png";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

const Navbar = () => {
  const [search, setSearch] = useState("");

  console.log("The Search Value : ", search);

  return (
    <div className="w-full flex flex-row ">
      {/* This is for the Flip logo and Search Section */}
      <div className="w-3/5">
        <img src={Logo} />
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray"
        />
      </div>

      {/* This is for the Sidebar section  */}
      <div className="w-2/5 flex flex-row justify-between items-center">
        <div className="flex">
          <CiUser />
          <span>Login</span>
        </div>
        <div className="flex">
          <IoCartOutline />
          <span>Cart </span>
        </div>
        <div className="flex">
          <AiOutlineHome />
          <span>Become a Seller</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
