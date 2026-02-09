import { useState } from "react";
import { MdVideoCall } from "react-icons/md";

function VideoSelector({ onChange }) {
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
      <div className="w-60 h-20  rounded-lg bg-blue-100 flex flex-col items-center justify-center overflow-hidden lg:w-sm lg:h-35">
        {/* upload btn */}
        <label
          htmlFor="video"
          className="text-sm text-blue-600"
          title="select  video"
        >
          {seletected ? (
            "Selected"
          ) : (
            <MdVideoCall size={35} className="cursor-pointer" />
          )}
        </label>
        <input
          className="hidden w-full h-full"
          id="video"
          type="file"
          accept="video/*"
          onChange={handleOnChange}
        />
      </div>
    </>
  );
}

export default VideoSelector;
