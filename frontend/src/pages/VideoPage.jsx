import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import VideoPlayer from "../components/VideoPlayer";
import VideoRecommendations from "../components/VideoRecommendations";
import CommentSection from "../components/CommentSection";
import Header from "../components/Header";
import VideoDescription from "../components/VideoDescription";
import VideoActionsBar from "../components/VideoActionsBar";

function WatchVideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/videos/${videoId}`)
      .then(({ data }) => setVideo(data))
      .finally(() => setLoading(false));
  }, [videoId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!video) return <p className="p-6">Video not found</p>;

  return (
    <section className="mt-35">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 py-4">
        {/* LEFT */}
        <div className="lg:col-span-8">
          <VideoPlayer video={video} />
          <VideoActionsBar
            video={{
              likes: 41000,
              channel: {
                name: "Apna College",
                subscribers: 7400000,
                avatar: "https://i.pravatar.cc/150",
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
