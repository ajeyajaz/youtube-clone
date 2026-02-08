import { useParams } from "react-router-dom";
import CommentSection from "../comment/CommentSection";
import Header from "../components/Header";
import VideoActionsBar from "../components/VideoActionsBar";
import VideoDescription from "../components/VideoDescription";
import VideoPlayer from "../components/VideoPlayer";
import VideoRecommendations from "../components/VideoRecommendations";
import useVideo from '../hooks/useVideo';

function WatchVideoPage() {

  const { videoId } = useParams();
  const {data:video, loading, error} = useVideo(videoId);

  console.log('channel video data', video);
  console.log('loading..', loading)

  if (loading) return <p className="p-6">Loading...</p>;
  

  return (
    <section className="mt-35">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 py-4">
        {/* LEFT */}
        <div className="lg:col-span-8">
          <VideoPlayer video={video} />
          <VideoActionsBar
            video={{
              likes: video.likes,
              channel: {
                name: video.channel?.name,
                subscribers: video.channel?.subscribers,
                avatar: video.channel?.coverImg.url,
              },
            }}
          />
          {/* Description */}
          <VideoDescription video={video} />
          <CommentSection videoId={video._id} />
        </div>
        {/* RIGHT */}
        <div className="lg:col-span-4">
          <VideoRecommendations />
        </div>
      </div>
    </section>
  );
}

export default WatchVideoPage;
