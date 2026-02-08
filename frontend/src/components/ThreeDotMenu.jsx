import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import apiClient from "../services/api-client";

function ThreeDotMenu({ videoId, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this video?")) return;

    try {
      setLoading(true);
      await apiClient.delete(`/videos/${videoId}`);
      onDelete(videoId); // update UI
    } catch (err) {
      console.error(err);
      alert("Failed to delete video");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative ml-auto">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(v => !v)
        }}
        className="p-2 rounded-full hover:bg-neutral-800"
      >
        <HiDotsVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-9 w-36 rounded-xl bg-neutral-900 border border-neutral-800 shadow-lg z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-neutral-800"
          >
            Edit
          </button>

          <button
            onClick={(e)=>{
              e.stopPropagation();
              handleDelete()
            }}
            disabled={loading}
            className="w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-800 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ThreeDotMenu;

