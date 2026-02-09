import { useState } from "react";
import VideoCard from "../video/VideoCard";
import { useSelector } from "react-redux";
import NoVideos from "../components/NoVidoes";


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

  if(videos.length === 0) return <NoVideos/>

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:px-2 md:gap-y-3">
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
      </div>
    </>
  );
}

export default ChannelBody;
