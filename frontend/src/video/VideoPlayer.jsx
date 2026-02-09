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

        {/* title */}

        <h1 className="text-xl font-semibold mt-4">{video.title}</h1>
      </div>
    </>
  );
}

export default VideoPlayer;
