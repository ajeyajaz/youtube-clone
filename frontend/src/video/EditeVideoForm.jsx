// src/components/EditVideoForm.jsx
import { useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { useForm } from "react-hook-form";
import videoSchema from "./videoValidationSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorMessage from "../components/ErrorMessage";
import ErrorToast from "../components/ErrorToast";
import PostIndicator from "../components/PostIndicator";
import TopLoadingBar from "../components/TopLoadingBar";
import videoService from "../services/video-service";

function EditVideoForm({ video, onClose, onUpdated }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(videoSchema) });

  const onSubmit = async (data) => {
    setPosting(true);
    setError("");

    const form = new FormData();
    form.append('videoInfo', JSON.stringify(data));
    
    if(thumbnail)
        form.append('thumbnail', thumbnail);

    try {
      const { data: result } = await videoService.put(video._id,form);
      onUpdated(result);

      onClose();
    } catch (ex) {
      setError(ex.response?.data || "Update failed");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="w-full max-h-max max-w-md bg-white rounded-xl p-6 space-y-5 text-black lg:max-w-xl">
        <form
          className="space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
        >
          {/* name */}
          <div>
            <input
              type="text"
              placeholder="Tittle"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("title")}
            />
            {errors.title && <ErrorMessage message={errors.title.message} />}
          </div>

          {/* Description */}
          <div>
            <textarea
              type="text"
              placeholder="Desctiption"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description")}
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>

          {/* Category */}
          <CategoryDropdown {...register("category")} />
          {errors.category && (
            <ErrorMessage message={errors.category.message} />
          )}

          <label htmlFor="thumbnail">
            Choose thumbnail
          </label>
          <input
            id="thumbnail"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />

          {/* actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {posting ? <PostIndicator /> : "update"}
            </button>
          </div>
        </form>
        {posting && <TopLoadingBar />}
        {error && <ErrorToast message={error} onClose={() => setError("")} />}
      </div>
    </div>
  );
}

export default EditVideoForm;
