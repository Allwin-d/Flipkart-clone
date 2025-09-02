import logo from "../assets/logo.svg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex w-full items-center justify-between px-6 py-3 shadow-md bg-white">
      {/* Left side (Logo + Search) */}
      <div className="flex items-center gap-6">
        <img
          src={logo}
          alt="Flipkart Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="relative ">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="bg-gray-100 pl-10 pr-4 py-2 w-96 rounded-md outline-none focus:ring-2 focus:ring-blue-500 border-none"
          />
        </div>
      </div>

      {/* Right side (Navigation) */}
      <div className="flex items-center gap-14">
        <button className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors duration-200 bg-transparent border-none p-0">
          <MdOutlineAccountCircle className="text-2xl" />
          <span>Account</span>
        </button>
        <button className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors duration-200 bg-transparent border-none p-0">
          <BsCart3 className="text-2xl" />
          <span>Cart</span>
        </button>
        <button className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors duration-200 bg-transparent border-none p-0">
          <IoHomeOutline className="text-2xl" />
          <span>Become a Seller</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
