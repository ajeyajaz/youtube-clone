import {
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { TbCircleOff } from "react-icons/tb";

function ActionButton({ icon: Icon, label, count }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition">
      <Icon size={18} />
      {count && <span className="text-sm font-medium">{count}</span>}
      {label && <span className="text-sm">{label}</span>}
    </button>
  );
}

function VideoActionsBar({ video }) {
  return (
    <section className="mt-3 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Channel info */}
      <div className="flex items-center gap-3">
        <img
          src={video.channel.avatar}
          alt="channel avatar"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-semibold leading-tight">
            {video.channel.name}
          </p>
          <p className="text-xs text-gray-400">
            {video.channel.subscribers?.toLocaleString()} subscribers
          </p>
        </div>

        <button className="ml-2 px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200">
          Subscribe
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <ActionButton
          icon={AiOutlineLike}
          count={video.likes?.toLocaleString()}
        />
        <ActionButton icon={AiOutlineDislike} />
        <ActionButton icon={FiShare2} label="Share" />
        <ActionButton icon={MdOutlineAutoAwesome} label="Ask" />
       

        <button className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
          <HiDotsHorizontal size={18} />
        </button>
      </div>
    </section>
  );
}

export default VideoActionsBar;
