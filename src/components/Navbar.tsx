import FlipkartLogo from "../images/original-logo.png";
import Search from "./Search";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  BECOME_A_SELLER,
  CART,
  MORE,
  MY_ACCOUNT,
} from "../Constants/Constants";
// import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-24 bg-blue-600 sticky top-0 z-50 flex flex-row">
      {/* This is the left side section contains the logo and searchbar */}
      <div className="flex flex-row items-center justify-end  w-1/2 space-x-3">
        <img
          src={FlipkartLogo}
          alt="Flipkart-Logo"
          className="w-40 h-12 hover:cursor-pointer"
          onClick={() => navigate("/")}
        ></img>
        <Search />
      </div>

      {/* This is the right side section contains more tabs */}
      <div className="w-1/2 flex flex-row items-center justify-around ">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <p className="text-white text-xl  font-medium">{MY_ACCOUNT}</p>
          <RiAccountCircleLine className="text-white text-4xl " />
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer ">
          <p className="text-white text-xl font-medium">{BECOME_A_SELLER}</p>
          <IoHomeOutline className="text-white text-4xl" />
        </div>

        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <p className="text-white text-xl  font-medium">{MORE}</p>
          <CiCircleMore className="text-white text-4xl" />
        </div>

        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <p className="text-white text-xl font-medium">{CART}</p>
          <IoCartOutline className="text-white text-4xl" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
