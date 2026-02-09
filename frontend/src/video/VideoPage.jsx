import { useParams } from "react-router-dom";
import CommentSection from "../comment/CommentSection";
import Header from "../components/Header";
import VideoActionsBar from "./VideoActionsBar";
import VideoDescription from "./VideoDescription";
import VideoPlayer from "./VideoPlayer";
import VideoRecommendations from "./VideoRecommendations";
import useVideo from "../hooks/useVideo";
import TopLoadingBar from "../components/TopLoadingBar";

function WatchVideoPage() {
  const { videoId } = useParams();
  const { data: video, loading, error } = useVideo(videoId);

  if (loading) return <TopLoadingBar />;
  if (error) return <p>something went wrong</p>;

  return (
    <section className="mt-20">
      <Header />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT – VIDEO AREA */}
          <div className="lg:col-span-8 space-y-4">
            {/* Video */}
            <div className="rounded-xl overflow-hidden bg-black shadow-lg">
              <VideoPlayer video={video} />
            </div>

            {/* Actions */}
            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4">
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
            </div>

            {/* Description */}
            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4">
              <VideoDescription video={video} />
            </div>

            {/* Comments */}
            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 max-h-100 overflow-y-auto scrollbar-hide">
              <CommentSection videoId={video._id} />
            </div>
          </div>

          {/* RIGHT – RECOMMENDATIONS */}
          <div className="lg:col-span-4 space-y-4">
            <div className="sticky top-24">
              <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4">
                <h3 className="text-sm font-semibold mb-4 text-neutral-300">
                  Up next
                </h3>
                <VideoRecommendations />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WatchVideoPage;
