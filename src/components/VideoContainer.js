import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard, { AdVideoCard } from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    setvideos(json.items);
  };

  return (
    <div className='flex flex-wrap'>
      {videos[0] && <AdVideoCard info={videos[0]} />}
      {videos.map(video => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video}/>
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
