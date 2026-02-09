import { MdVideoCall } from "react-icons/md";


function VideoSelector({ onChange }) {
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onChange?.(file);
  };

  return (
    <>
      {/* preview */}
      <div className="w-60 h-35  rounded-lg bg-blue-100 flex flex-col items-center justify-center overflow-hidden lg:w-sm">
        {/* upload btn */}
        <label
          htmlFor="video"
          className="text-sm text-blue-600"
          title="select  video"
        >
          <MdVideoCall size={35} className="cursor-pointer"  />
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
