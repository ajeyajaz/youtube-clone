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
          className="flex gap-3 cursor-pointer hover:bg-neutral-800 p-2 rounded-lg"
        >
          <img
            src={v.thumbnail}
            alt=""
            className="w-40 h-24 object-cover rounded-md"
          />
          <div>
            <p className="text-sm font-medium line-clamp-2">{v.title}</p>
            <p className="text-xs text-neutral-400">{v.channel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoRecommendations;
