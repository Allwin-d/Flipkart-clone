import logo from "../images/Flipkart-logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="w-full p-6 flex flex-row space-x-5 bg-yellow-100 ">
      <div className="flex flex-row space-x-5 w-3/5">
        <img
          src={logo}
          alt="flipkart-logo"
          width={150}
          height={150}
          className="cursor-pointer"
          onClick={handleClick}
        ></img>
        <div className="flex flex-row w-full">
          <CiSearch className="relative top-8 left-8 text-xl" />
          <input
            type="text"
            className="w-full pl-10 rounded-lg border-2 border-black font-medium text-2xl focus:outline-none bg-gray-100"
            placeholder="Search for Products , Brands and More"
          ></input>
        </div>
      </div>
      <div className="w-2/5 flex flex-row space-x-8 justify-around items-center">
        <div className="flex space-x-2 font-medium text-2xl cursor-pointer">
          <FaRegUserCircle className="mt-1" />
          <span>Login</span>
        </div>
        <div className="flex space-x-2 font-medium text-2xl cursor-pointer">
          <IoCartOutline className="mt-1" />
          <span>Cart</span>
        </div>
        <div className="flex space-x-2 font-medium text-2xl cursor-pointer">
          <IoHomeOutline className="mt-1" />
          <span>Become a Seller</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
