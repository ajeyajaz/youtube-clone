import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaRegImages } from "react-icons/fa";

function ThumbnailSelector({ onChange }) {
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onChange?.(file);
  };

  return (
    <>
      {/* preview */}
      <div className="w-40 h-28  rounded-lg bg-blue-100 flex flex-col items-center justify-center overflow-hidden">
        {/* upload btn */}
        <label
          htmlFor="thumbnail"
          className="text-sm text-blue-600 cursor-pointer"
          title="select  thumbnail"
        >
          <FaRegImages size={35} />
        </label>
        <input
          className="hidden w-full h-full"
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleOnChange}
        />
      </div>
    </>
  );
}

export default ThumbnailSelector;
