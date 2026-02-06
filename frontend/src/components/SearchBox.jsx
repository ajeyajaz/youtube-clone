import { IoSearch, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";


export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(setSearchText(searchText.trim()));
    setSearchText('');
  };

  return (
    <>
      {/* Desktop / Tablet Search */}
      <div
        className="
          hidden sm:flex items-center h-10
          w-full
          rounded-full bg-neutral-900 overflow-hidden
          border border-neutral-700
        "
      >
        <input
          type="text"
          placeholder="Search"
          className="
            flex-1 h-full px-4 text-sm
            bg-transparent text-white placeholder-gray-400
            outline-none
          "
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          type="submit"
          className="h-full px-5 text-gray-300 bg-neutral-800
                     hover:bg-neutral-700 transition"
          onClick={() => onSubmit()}
        >
          <IoSearch size={18} />
        </button>
      </div>

      {/* Mobile Icon */}
      <button
        className="sm:hidden p-2 text-gray-300"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <IoSearch size={22} />
      </button>

      {/* Mobile Fullscreen Search */}
      {open && (
        <div className="fixed inset-0 z-50 bg-neutral-900 flex items-center">
          <div className="absolute top-5 w-full px-2 flex items-center">
            <button
              className="text-gray-300 mr-3"
              onClick={() => {
                setOpen(false);
                setSearchText("");
              }}
            >
              <IoClose size={24} />
            </button>
            <div className="flex items-center h-10 flex-1 rounded-full bg-neutral-900 overflow-hidden border border-neutral-700">
              <input
                autoFocus
                type="text"
                placeholder="Search"
                className="
                  flex-1 h-full px-4 text-sm
                  bg-transparent text-white placeholder-gray-400
                  outline-none
                "
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                type="submit"
                className="h-full px-4 bg-neutral-800 text-gray-300"
                onClick={() => onSubmit()}
              >
                <IoSearch size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
