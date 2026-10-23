import FlipkartLogo from "../../images/original-logo.png";
import Search from "../Search/Search";
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
} from "../../Constants/ConstantVariables/constantsVariables";
import useCartCount from "../../Hooks/useCartCount";

const Navbar = () => {
  const navigate = useNavigate();
  const cartLength = useCartCount();

  return (
    <div className="sticky top-0 z-50 flex w-full flex-col bg-blue-600 md:h-24 md:flex-row">
      {/* This is the left side section contains the logo and searchbar */}
      <div className="flex w-full flex-row items-center justify-between gap-2 px-3 py-2 md:w-1/2 md:justify-end md:space-x-3 md:px-0 md:py-0">
        <img
          src={FlipkartLogo}
          alt="Flipkart-Logo"
          className="h-9 w-28 shrink-0 cursor-pointer object-contain sm:h-10 sm:w-32 md:h-12 md:w-40"
          onClick={() => navigate("/")}
        ></img>
        <Search />
      </div>

      {/* This is the right side section contains more tabs */}
      <div className="flex w-full flex-row items-center justify-around gap-1 px-2 pb-2 md:w-1/2 md:px-0 md:pb-0">
        <div className="hidden cursor-pointer items-center justify-center gap-2 lg:flex">
          <p className="text-xl font-medium text-white">{MY_ACCOUNT}</p>
          <RiAccountCircleLine className="text-4xl text-white" />
        </div>
        <div className="hidden cursor-pointer items-center justify-center gap-2 sm:flex">
          <p className="text-sm font-medium text-white md:text-xl">{BECOME_A_SELLER}</p>
          <IoHomeOutline className="text-2xl text-white md:text-4xl" />
        </div>

        <div className="hidden cursor-pointer items-center justify-center gap-2 md:flex">
          <p className="text-xl font-medium text-white">{MORE}</p>
          <CiCircleMore className="text-4xl text-white" />
        </div>

        <div
          className="flex cursor-pointer items-center justify-center gap-1"
          onClick={() => navigate("/cart")}
        >
          <p className="hidden text-sm font-medium text-white md:block md:text-xl">{CART}</p>
          <IoCartOutline className="text-2xl text-white md:text-4xl" />
          <p
            className={`${cartLength >= 1 ? `rounded-full border border-white bg-red-500 px-2 py-0.5 text-xs font-bold text-white md:border-2 md:px-4 md:py-2 md:text-base` : ``}`}
          >
            {cartLength >= 1 ? cartLength : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
