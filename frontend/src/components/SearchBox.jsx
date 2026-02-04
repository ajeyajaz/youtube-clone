import { IoSearch } from "react-icons/io5";

export default function SearchBox() {
  return (
    <div className="flex items-center w-full max-w-xl h-10 rounded-full bg-neutral-900 overflow-hidden">
      {/* Input */}
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent h-full px-4 py-2 text-sm 
        rounded-l-full border border-neutral-600  outline-0 focus:border-blue-700 ease-in duration-100"
      />
      {/* Search Button */}
      <button
        className=" px-4 py-2 h-full text-gray-300 bg-neutral-800  
        border rounded-r-full border-l-0 cursor-pointer border-neutral-600 "
        aria-label="Search"
      >
        <IoSearch size={18} />
      </button>
    </div>
  );
}
