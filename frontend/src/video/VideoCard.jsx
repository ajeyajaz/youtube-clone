import { useState } from "react";
import formatter from "../services/views-formater";
import CircleImage from "../components/CircleImage";
import ThreeDotMenu from "../components/ThreeDotMenu";
import EditVideoForm from "./EditeVideoForm";
import { useNavigate } from "react-router-dom";

function VideoCard({ video, isOwner, isChannelPage, onDeleted, onUpdated }) {
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const publishedDate = new Date(video.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const handleClick = () => {
    navigate(`/videos/${video._id}`);
  };

  const showMenu = isOwner && isChannelPage;

  return (
    <div className="group relative w-full cursor-pointer md:rounded-xl md:p-3 hover:bg-gray-900 transition-all duration-300"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden md:rounded-lg">
        <img
          src={video.thumbnail.url}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="relative mt-2 flex gap-3 px-2 pb-4 md:px-0 md:pb-0">
        {!isChannelPage && (
          <CircleImage src={video.channel.owner.avatar?.url || "https://www.gravatar.com/avatar/?d=mp"} w={10} h={10} />
        )}

        <div className="flex-1">
          <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>

          <div className="mt-1 text-sm text-gray-400">
            <p className="line-clamp-1">{video.channel.name}</p>
            <p>
              {formatter.format(video.views)} views • {publishedDate}
            </p>
          </div>
        </div>

        {showMenu && (
          <ThreeDotMenu
            videoId={video._id}
            onDelete={onDeleted}
            onEdit={() => setShowEdit(true)}
          />
        )}
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl bg-[#0f0f0f] p-6">
            <EditVideoForm
              video={video}
              onClose={() => setShowEdit(false)}
              onUpdated={onUpdated}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCard;
