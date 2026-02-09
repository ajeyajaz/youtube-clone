import { GoPlus } from "react-icons/go";
import VideoUploadModal from "../video/VideoUploadModal";
import { useState } from "react";

export default function CreateButton() {
  const [onClick, setOnclick] = useState(false);

  return (
    <>
      <button
        onClick={()=> setOnclick(true)}
        className="
        hidden items-center gap-2
        px-4 h-9
        rounded-full
        border border-neutral-700
        text-sm font-medium
        hover-eff
        transition-colors   
        md:flex
      "
      >
        <GoPlus size={18} />
        <span className="hidden text-sm sm:inline">Create</span>
      </button>
      {onClick && <VideoUploadModal onClose={() => setOnclick(false)}/>}
    </>
  );
}
