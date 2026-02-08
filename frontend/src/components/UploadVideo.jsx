import { useState } from "react";
import apiClient from "../services/api-client";
import { useSelector } from "react-redux";

function UploadVideo({ onUploaded }) {
  const {
    user: { channel },
  } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    channel: channel?._id,
  });

  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !thumbnail) {
      alert("Video and thumbnail are required");
      return;
    }

    const data = new FormData();
    data.append("videoInfo", JSON.stringify(form));
    data.append("video", video);
    data.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      const res = await apiClient.post("/videos", data);
      onUploaded?.(res.data); // update UI
      alert("Video uploaded");
    } catch (err) {
      console.log("error", err.response.data);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 bg-neutral-900 p-6 rounded-xl border border-neutral-800"
    >
      <h2 className="text-xl font-semibold">Upload Video</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full bg-neutral-800 px-4 py-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full bg-neutral-800 px-4 py-2 rounded"
        required
      />

      <input
        name="category"
        placeholder="Category ID"
        value={form.category}
        onChange={handleChange}
        className="w-full bg-neutral-800 px-4 py-2 rounded"
        required
      />

      <div>
        <label className="block mb-1 text-sm">Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="w-full"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

export default UploadVideo;
