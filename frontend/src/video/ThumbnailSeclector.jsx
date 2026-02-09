import { useState } from "react";
import { FaRegImages } from "react-icons/fa";

function ThumbnailSelector({ onChange }) {
  const [seletected, setSelected] = useState(false);

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelected(true);
    onChange?.(file);
  };

  return (
    <>
      {/* preview */}
      <div className="w-40 h-15  rounded-lg bg-blue-100 flex flex-col items-center justify-center overflow-hidden lg:h-25">
        {/* upload btn */}
        <label
          htmlFor="thumbnail"
          className="text-sm text-blue-600 cursor-pointer"
          title="select  thumbnail"
        >
          {seletected ? "Selected" : <FaRegImages size={35} />}
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
