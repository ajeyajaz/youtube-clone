

function VideoPlayer({ video }) {
  return (
    <>
      <div className="w-full">
        {/* Video */}
        <video
          controls
          autoPlay
          className="w-full rounded-xl bg-black"
          src={video.video?.url || ""}
        />

        {/* Info */}
        <div className="mt-4">
          <h1 className="text-xl font-semibold">{video.title}</h1>
          <p className="text-sm text-neutral-400 mt-1">
            {video.views} views •{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
