import { useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const navigate = useNavigate();

  return (
    <div className="flex border-b">
      <input
        className="m-3 px-2 py-1 border-2 w-4/5 rounded-full bg-gray-100 text-center"
        type="text"
        placeholder="Search your friends"
        value={searchQuery}
        onChange={(e: any) => setSearchQuery(e.target.value)}
      />
      <button
        className="flex-grow"
        onClick={() => {
          setSearchQuery("");
          navigate(`/${searchQuery}`);
        }}
      >
        <RightIcon className="" />
      </button>
    </div>
  );
};

export default Search;
