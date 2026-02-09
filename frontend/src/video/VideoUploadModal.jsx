import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CategoryDropdown from "../components/CategoryDropdown";
import ErrorMessage from "../components/ErrorMessage";
import ErrorToast from '../components/ErrorToast';
import PostIndicator from '../components/PostIndicator';
import TopLoadingBar from '../components/TopLoadingBar';
import videoService from "../services/video-service";
import ThumbnailSelector from "./ThumbnailSeclector";
import VideoSelector from "./VideoSelector";
import videoValidationSchema from "./videoValidationSchema";

function CreateVideoModal({onClose}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: joiResolver(videoValidationSchema)});

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);

  const handelUploadThumbnail = (file) => {
    setThumbnail(file);
  };

  const handelUploadIVideo = (file) => {
    setVideo(file);
  };

  // upload
  const onSubmit = async (data) => {
    if(!thumbnail){
      setError('thumbnail required.')
      return
    }
    if(!video){
      setError('video required.')
      return
    }
    const form = new FormData();

    form.append("videoInfo", JSON.stringify({...data, channel: user.channel?._id}));
    form.append("video", video);
    form.append("thumbnail", thumbnail);

    try {
      setPosting(true);
      await videoService.post(form); 
      navigate(`channel/${user.channel?.handle}`) // navigate -> channel page
    } catch (ex) {
      setError(ex.response?.data || 'something went wrong.')
    } 
    finally{
      onClose(); // close form
      setPosting(false);
      setVideo(null);
      setThumbnail(null);
    }
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-white rounded-xl p-6 space-y-5 text-black lg:max-w-xl">
        {/* Title */}
        <h2 className="text-lg font-semibold">Upload video</h2>

        {/* files selector */}
        <div className="flex flex-col items-center gap-2">
          <VideoSelector onChange={handelUploadIVideo} />
          <ThumbnailSelector onChange={handelUploadThumbnail}/>
        </div>
        

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.description && <ErrorMessage message={errors.description.message} />}
          </div>

          {/* Category */}
          <CategoryDropdown {...register("category")} />
          {errors.category && <ErrorMessage message={errors.category.message} />}

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
              {posting ? <PostIndicator/> : 'upload'}
            </button>
          </div>
        </form>
      </div>
      {posting && <TopLoadingBar/>}
      { error &&  <ErrorToast  message={error} onClose={() => setError('')}/>}
    </section>
  );
}

export default CreateVideoModal
