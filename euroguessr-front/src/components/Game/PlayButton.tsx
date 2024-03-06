import { ReactNode, useEffect, useState } from 'react';
import { API } from '../../services/api';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

interface PlayButtonProps {
  className?: string;
}

export function PlayButton({className}: PlayButtonProps) {

  const [isLoaded, setIsLoaded] = useState<boolean | undefined>(false);
  const [isListening, setIsListening] = useState(false);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);
  const [videoElement, setVideoElement] = useState<YouTubePlayer | null>(null);

  useEffect(() => {
    getVideoId();
  }, [isLoaded]);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.setVolume(50);
    event.target.seekTo(seekTo);
    event.target.playVideo();
    event.target.pauseVideo();
    setVideoElement(event);
    setIsLoaded(true);
    console.log("Player READY!");
    console.log(event);
    console.log("Video ID: " + videoId);
  }

  const onPlayerEnd: YouTubeProps['onEnd'] = () => {
    videoElement.target.pauseVideo();
    videoElement.target.seekTo(seekTo);
    setIsListening(false);
  }

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    controls : '0', 
  };

  function getVideoId() {
    const api = API.getInstance();
    const response = api.get('song/daily');
    response.then((data) => {
      setVideoId(data.video_id);
      setSeekTo(data.seek_to);
    });
  }

  function toggleSong() {
    if(isLoaded) {
      videoElement.target.seekTo(seekTo);
      if(!isVideoPlaying()) {
        setIsListening(true);
        videoElement.target.playVideo();
      } else {
        setIsListening(false);
        videoElement.target.pauseVideo();
        videoElement.target.seekTo(seekTo);
      }
    }
  }

  function isVideoPlaying():boolean {
    if(!videoElement) return false;
    return videoElement.target.playerInfo.playerState === YouTube.PlayerState.PLAYING;
  }

  function loadingIcon(): ReactNode {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="white" className="w-[65%] h-[65%] animate-spin">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    )
  }
  
  function playIcon(): ReactNode {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-[65%] h-[65%] ml-[6%]">
        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
      </svg>
    )
  }
  
  function stopIcon(): ReactNode {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[65%] h-[65%]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
      </svg>
    )
  }

  return (
    <>
      <button onClick={toggleSong} className={`${isListening ? "animate-wiggle" : ""} ${className}`}>
        {!isLoaded ? loadingIcon() : (isListening ? stopIcon() : playIcon())}
      </button>
      {videoId && <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} onEnd={onPlayerEnd} className="absolute" />}
    </>
  );
}
