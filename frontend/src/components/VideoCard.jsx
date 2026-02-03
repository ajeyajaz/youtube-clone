import formatter from "../services/views-formater";

function VideoCard({ video }) {
  const pushlishedDate = new Date(video.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <div className="group w-full cursor-pointer md:rounded-xl md:p-3 hover:bg-gray-900 transition-all ease-out duration-400">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden md:rounded-lg">
        <img
          src={video.thumbnail.url}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-103"
        />
        {/* Duration */}
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="mt-2 flex flex-row gap-3 pb-4 px-2 md:px-0 md:pb-0">
        {/* Channel Avatar */}
        <img
          src={video.thumbnail.url}
          className="h-9 w-9 rounded-full object-cover"
        />

        {/* text */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
          <div className="flex items-baseline gap-x-3 gap-y-1 text-sm text-gray-400 md:flex-col">
            <p className="line-clamp-2">dog master</p>
            <p>
              {formatter.format(video.views)} views • {pushlishedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
