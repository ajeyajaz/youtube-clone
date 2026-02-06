import { HiOutlinePlay } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";

function EmptyAuthState({ onSignIn }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      {/* Icon */}
      <div className="mb-6 text-white">
        <div className="relative">
          <div className="absolute -left-2 top-2 w-14 h-14 border-2 border-white rounded-lg opacity-60"></div>
          <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center">
            <HiOutlinePlay className="w-8 h-8 ml-1" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">
        Enjoy your favorite videos
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-neutral-400 max-w-sm mb-6">
        Sign in to access videos that you&apos;ve liked or saved
      </p>

      {/* Sign in button */}
      <button
        onClick={onSignIn}
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-full
          border border-blue-500
          text-blue-500
          hover:bg-blue-500/10
          transition
        "
      >
        <HiOutlineUserCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Sign in</span>
      </button>
    </div>
  );
}

export default EmptyAuthState;
