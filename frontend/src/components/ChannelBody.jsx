import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

function ChannelBody({ channel }) {
  const { user } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(channel?.videos || []);
  }, [channel]);

  const handleDelete = (videoId) => {
    setVideos((prev) => prev.filter((v) => v._id !== videoId));
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
      {videos.map((v) => (
        <VideoCard
          key={v._id}
          video={v}
          isOwner={channel.owner === user?._id}
          isChannelPage={true}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default ChannelBody;
