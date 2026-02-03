function VideoCard({
  thumbnail,
  duration,
  title,
  channelName,
  channelAvatar,
  views,
  uploadedAt,
}) {
  return (
    <div className="w-100 cursor-pointer md:rounded-xl md:p-3 border">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden md:rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
        {/* Duration */}
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="mt-2 flex flex-row gap-3 pb-2 px-2 md:px-0">
        {/* Channel Avatar */}
        <img
          src={channelAvatar}
          alt={channelName}
          className="h-9 w-9 rounded-full object-cover"
        />

        {/* text */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold line-clamp-2">
            {title}
          </h3>
          <div className="flex items-baseline gap-x-3 gap-y-1 text-sm text-gray-400 md:flex-col">
            <p className="line-clamp-2">{channelName}</p>
            <p>{views} views • {uploadedAt}  </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default VideoCard;
