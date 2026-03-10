import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDebounce } from "../Hooks/useDebounce";

const Search = () => {
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 500);
  console.log("Debounced Value : ", debouncedValue);

  return (
    <div className="w-3/4 p-4 relative">
      <IoIosSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search Products..."
        className="w-full p-4 pl-12 mt-1 border rounded focus:outline-none"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Search;
