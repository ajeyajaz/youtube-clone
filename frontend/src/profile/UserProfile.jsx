import { useSelector } from "react-redux";
import CircleImage from "../components/CircleImage";
import { useState } from "react";
import CreateChannelModal from "../channel/CreateChannelModal";
import useCreateChannel from "../channel/useCreateChannel";
import TopLoadingBar from "../components/TopLoadingBar";
import ErrorToast from "../components/ErrorToast";

function UserProfile() {
  const [clickCreateChannel, setClickCreateChannel] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { create, isLoading, error, setError } = useCreateChannel();

  return (
    <section className="w-full px-6 py-6">
      <div className="flex flex-col items-center gap-6 py-16">
        {/* Avatar */}
        <div className="relative">
          <CircleImage
            src={user.avatar?.url || "https://www.gravatar.com/avatar/?d=mp"}
            w={20}
            h={20}
          />

          {/* soft glow ring */}
          <div className="absolute inset-0 rounded-full ring-2 ring-neutral-700/60 pointer-events-none" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 items-center text-center">
          <h1 className="text-2xl font-bold truncate max-w-60 tracking-wide">
            {user.userName}
          </h1>

          <p className="text-sm text-neutral-400">
            You don't have a channel yet
          </p>

          {/* Actions */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setClickCreateChannel(true)}
              className="
          px-5 py-2.5
          rounded-xl
          border border-neutral-700
          bg-neutral-900
          text-sm font-medium
          hover:bg-neutral-800
          hover:border-neutral-600
          transition-all
        "
            >
              Create channel
            </button>
          </div>
        </div>
      </div>

      {/* create channel modal */}
      {clickCreateChannel && (
        <CreateChannelModal
          onClose={() => setClickCreateChannel(false)}
          createChannel={(form) => {
            create(form);
          }}
        />
      )}

      {isLoading && <TopLoadingBar />}

      {/* errror message */}
      <ErrorToast message={error} onClose={() => setError("")} />
    </section>
  );
}

export default UserProfile;
