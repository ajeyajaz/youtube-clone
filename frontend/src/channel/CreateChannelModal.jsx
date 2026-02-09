import { useState } from "react";
import { useForm } from "react-hook-form";
import AvatarSelector from "../profile/AvatarSelector";
import channelSchema from "./channelValidationSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorMessage from "../components/ErrorMessage";

function CreateChannelModal({ onClose, createChannel }) {
  const { register, handleSubmit,  formState: { errors } } = useForm( {resolver: joiResolver(channelSchema)});
  const [image, setImage] = useState(null);
  

  const handelUploadImage = (file) => {
    setImage(file);
  };

  const onSubmit = (data) => {
    const form = new FormData();

    form.append('avatar', image);
    form.append('channel', JSON.stringify(data));

    createChannel?.(form);
  }
  

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-white rounded-xl p-6 space-y-5 text-black">
        {/* Title */}
        <h2 className="text-lg font-semibold">How you'll appear</h2>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <AvatarSelector onChange={handelUploadImage} />
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name")}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>

          {/* handle */}
          <div>
            <input
              type="text"
              placeholder="@handle"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("handle")}
            />
            {errors.handle && <ErrorMessage message={errors.handle.message} />}
          </div>
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
              Create channel
            </button>
          </div>
        </form>

        {/* Info text */}
        <p className="text-xs text-gray-500">
          By clicking Create channel you agree to YouTube's
          <span className="text-blue-600 cursor-pointer">Terms of Service</span>
        </p>
      </div>
    </section>
  );
}

export default CreateChannelModal;
