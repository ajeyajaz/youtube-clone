import formatter from "../services/views-formater";
import CircleImage from "./CircleImage";
import ThreeDotMenu from "./ThreeDotMenu";

function VideoCard({ video, isOwner, isChannelPage, onDelete }) {
  const publishedDate = new Date(video.createdAt).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );

  const showEdit = isOwner && isChannelPage;

  return (
    <div className="group w-full cursor-pointer md:rounded-xl md:p-3 hover:bg-gray-900 transition-all">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden md:rounded-lg">
        <img
          src={video.thumbnail.url}
          alt={video.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
        />
        <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-xs rounded">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="relative mt-2 flex gap-3 px-2 md:px-0">
        {!isChannelPage && (
          <CircleImage src={video.channel.owner.avatar.url} w={10} h={10} />
        )}

        <div className="flex flex-col">
          <h3 className="font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-sm text-gray-400">
            {video.channel.name}
          </p>
          <p className="text-sm text-gray-400">
            {formatter.format(video.views)} views • {publishedDate}
          </p>
        </div>

        {showEdit && (
          <ThreeDotMenu
            videoId={video._id}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}

export default VideoCard;
