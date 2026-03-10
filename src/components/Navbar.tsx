import FlipkartLogo from "../images/original-logo.png";
import Search from "./Search";
// import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-full h-24 bg-blue-600 sticky top-0 z-50 flex flex-row">
      {/* This is the left side section contains the logo and searchbar */}
      <div className="flex flex-row items-center justify-end  w-1/2 space-x-3">
        <img src={FlipkartLogo} alt="Flipkart-Logo" className="w-40 h-12"></img>
        <Search />
      </div>

      {/* This is the right side section contains more tabs */}
      <div className="w-1/2 flex flex-row items-center justify-around ">
        <p className="text-white text-xl cursor-pointer font-medium">
          My Account{" "}
        </p>
        <p className="text-white text-xl cursor-pointer font-medium">
          Become a Seller
        </p>
        <p className="text-white text-xl cursor-pointer font-medium">More</p>
        <p className="text-white text-xl cursor-pointer font-medium">Cart</p>
      </div>
    </div>
  );
};
export default Navbar;
