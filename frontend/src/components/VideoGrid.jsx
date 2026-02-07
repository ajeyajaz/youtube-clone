import useVideos from "../hooks/useVideos";
import VideoCard from "./VideoCard";
import TopLoadingBar from "./TopLoadingBar";

function VideoGrid() {
  const { data: videos, error, isLoading } = useVideos();

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:px-2 md:gap-y-3 ">
        {videos.map((v) => (
          <VideoCard key={v._id} video={v} isOwner={false} isChannelPage={false} />
        ))}
      </div>

      {/* loading */}
        {isLoading && <TopLoadingBar/>}
    </>
  );
}

export default VideoGrid;
