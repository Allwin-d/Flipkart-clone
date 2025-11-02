import logo from "../assets/logo.svg";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { LuHouse } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function handleClick() {
    console.log("Clicked on Home icon ");
    navigate("/");
  }

  return (
    <div>
      <div className="flex flex-row w-full h-20 p-8 bg-yellow-300  space-x-3 ">
        <div className="w-3/5 flex flex-row justify-between items-center ">
          <img
            src={logo}
            alt="Flipkart-log"
            className="cursor-pointer"
            onClick={handleClick}
          ></img>
          <input
            type="text"
            placeholder="Search for Products, Brands and More "
            className="p-3 rounded-lg outline-none font-mono text-xl focus:border-2 border-blue-500  w-2/3"
          ></input>
        </div>
        <div className="w-2/5 flex flex-row justify-evenly items-center ">
          <div className="flex flex-row space-x-2 text-xl cursor-pointer">
            <FaRegUserCircle className="mt-1" />
            <span className="font-mono ">User</span>
          </div>
          <div className="flex flex-row space-x-2 text-xl cursor-pointer">
            <IoCartOutline className="mt-1" />
            <span className="font-mono">Cart</span>
          </div>
          <div className="flex flex-row space-x-2 text-xl cursor-pointer">
            <LuHouse className="mt-1" />
            <span className="font-mono">Become a Seller</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
