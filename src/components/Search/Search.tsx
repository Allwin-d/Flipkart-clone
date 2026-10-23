import { useEffect, useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDebounce } from "../../Hooks/useDebounce";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Input from "../Input/Input";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const navigate = useNavigate();
  const location = useLocation();
  const isUserTyping = useRef(false);

  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUserTyping.current = true;
    setValue(e.target.value);
  };

  useEffect(() => {
    const trimmed = debouncedValue?.trim();

    if (!trimmed) return;
    if (!isUserTyping.current) return;

    //here it will navigate to the products page only when the value length is > 3
    if (trimmed.length >= 3) {
      navigate(`/products?search=${trimmed}`);
    }

    isUserTyping.current = false;
  }, [debouncedValue, navigate]);

  useEffect(() => {
    if (!location.pathname.startsWith("/products")) return;
    const paramValue = searchParams.get("search") ?? "";
    setValue(paramValue);
  }, [searchParams, location.pathname]);

  return (
    <div className="relative w-full md:w-3/4 md:p-4">
      <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 md:left-7" />
      <Input
        type="text"
        placeholder="Search Products..."
        className="mt-1 w-full rounded border p-2 pl-9 text-sm focus:outline-none sm:p-3 sm:pl-10 md:p-4 md:pl-12 md:text-base"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
