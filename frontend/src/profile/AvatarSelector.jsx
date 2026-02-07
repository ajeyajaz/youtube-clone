import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";


function AvatarSelector({onChange}) {
    const [preview, setPreview] = useState(null);

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if(!file) return;

        setPreview(URL.createObjectURL(file));
        onChange?.(file);
    }

    useEffect(() => {
      if (preview) 
        return () => URL.revokeObjectURL(preview);
    }, [preview])

  return (
    <>
        {/* preview */}
      <div className='w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden'>
        {preview ? (
          <img src={preview} className="object-cover w-full h-full" />
        ) : (
          <HiOutlineUserCircle className="w-14 h-14 text-blue-600" />
        )}
      </div>

        {/* upload field */}
      <div className="flex flex-col items-center gap-2">
        <label
          htmlFor="avatar"
          className="text-sm text-blue-600 hover:underline"
        >
          select picture
        </label>
        <input
          className="hidden"
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleOnChange}
          placeholder="select picture"
        />
      </div>
    </>
  );
}

export default AvatarSelector;
