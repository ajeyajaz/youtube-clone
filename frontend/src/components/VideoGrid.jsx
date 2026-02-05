import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import  apiClient from '../services/api-client'

function VideoGrid() {
  const [vidoes, setVideos] = useState([]);

  useEffect(() =>{
    (() => {
      apiClient.get('/videos')
        .then(res => setVideos(res.data))
        .catch(ex => console.error('could not get vidoes: ', ex))
    })()
    
  },[]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-30 md:px-2 md:gap-y-3 ">
      {vidoes.map(v => <VideoCard key={v._id} video={v}/>)}
    </div>
  );
}

export default VideoGrid;
