import { useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";
import UploadVideo from "../components/UploadVideo";

function ChannelBody({ channel }) {
  const { user } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState(channel.videos);

  // delete handler
  const handleDelete = (videoId) => {
    setVideos((prev) => prev.filter((v) => v._id !== videoId));
  };

  // update handler
  const handleUpdate = (updatedVideo) => {
    setVideos((prev) =>
      prev.map((v) => (v._id === updatedVideo._id ? updatedVideo : v)),
    );
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:px-2 md:gap-y-3">
        {videos.map((v) => (
          <VideoCard
            key={v._id}
            video={v}
            isOwner={channel?.owner === user?._id}
            isChannelPage={true}
            onDeleted={handleDelete}
            onUpdated={handleUpdate}
          />
        ))}
        <UploadVideo
          onUploaded={(video) => setVideos((prev) => [video, ...prev])}
        />
      </div>
    </>
  );
}

export default ChannelBody;
