import { useEffect, useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDebounce } from "../Hooks/useDebounce";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

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

    navigate(`/products?search=${trimmed}`);
    isUserTyping.current = false; 
  }, [debouncedValue, navigate]);

  useEffect(() => {
    if (!location.pathname.startsWith("/products")) return;
    const paramValue = searchParams.get("search") ?? "";
    setValue(paramValue);
  }, [searchParams, location.pathname]);

  return (
    <div className="w-3/4 p-4 relative">
      <IoIosSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search Products..."
        className="w-full p-4 pl-12 mt-1 border rounded focus:outline-none"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
