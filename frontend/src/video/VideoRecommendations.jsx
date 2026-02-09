const dummyVideos = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: `Recommended video ${i + 1}`,
  channel: "Dummy Channel",
  thumbnail: "https://placehold.co/320x180/111/fff?text=Video",
}));

function VideoRecommendations() {
  return (
    <div className="space-y-3">
      {dummyVideos.map((v) => (
        <div
          key={v.id}
          className="
        flex gap-3 p-2 rounded-xl cursor-pointer
        hover:bg-neutral-800/60 transition
      "
        >
          {/* Thumbnail */}
          <div className="relative flex-shrink-0">
            <img
              src={v.thumbnail}
              alt={v.title}
              loading="lazy"
              className="
            w-36 h-20
            sm:w-40 sm:h-24
            object-cover rounded-lg
          "
            />

            {/* Duration badge (static for now) */}
            <span className="absolute bottom-1 right-1 text-[10px] bg-black/80 px-1.5 py-0.5 rounded">
              12:45
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-sm font-medium line-clamp-2 leading-snug">
              {v.title}
            </p>

            <p className="text-xs text-neutral-400 truncate">{v.channel}</p>

            <p className="text-[11px] text-neutral-500">
              120K views · 2 days ago
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoRecommendations;
