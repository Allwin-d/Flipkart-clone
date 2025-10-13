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
    <div>
      <div className="flex flex-row items-center justify-center">
        <img src={FlipkartLogo} alt="Logo" />
        <div>
          <IoSearchOutline />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            onChange={handleChange}
            value={search}
          />
        </div>
        <div className="flex space-x-2">
          <FaUserCircle />
          <span>Login</span>
        </div>
        <div className="flex space-x-2">
          <BsCart3 />
          <span>Cart</span>
        </div>
        <div className="flex space-x-2">
          <IoHomeOutline />
          <span>Become a Seller</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
