import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDebounce } from "../Hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const trimmed = debouncedValue?.trim();

    if (!trimmed) return;
    if (
      location.pathname.startsWith("/productDetails") &&
      trimmed.length >= 1
    ) {
      navigate(`/products?search=${trimmed}`);
      setValue("");
    } else if (trimmed.length >= 1) {
      navigate(`/products?search=${trimmed}`);
      setValue("");
    }
  }, [debouncedValue, navigate]);

  return (
    <div className="w-3/4 p-4 relative">
      <IoIosSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500" />

      <input
        type="text"
        placeholder="Search Products..."
        className="w-full p-4 pl-12 mt-1 border rounded focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
