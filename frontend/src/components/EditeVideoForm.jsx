// src/components/EditVideoForm.jsx
import { useState } from "react";
import { updateVideo } from "../services/videoService";

function EditVideoForm({ video, onClose, onUpdated }) {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [category, setCategory] = useState(video.category);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await updateVideo({
        videoId: video._id,
        title,
        description,
        category,
        thumbnail,
      });

      onUpdated(data);
      onClose();
    } catch (ex) {
      setError(ex.response?.data || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        className="w-full p-2 bg-neutral-900 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="w-full p-2 bg-neutral-900 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        className="w-full p-2 bg-neutral-900 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category ID"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          onClick={(e) => e.stopPropagation()}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <button
          type="button"
          onClick={(e)=> {
            e.stopPropagation();
            onClose();
          }}
          className="px-4 py-2 bg-neutral-700 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditVideoForm;
