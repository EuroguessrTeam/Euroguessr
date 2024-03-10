import { ReactNode, useEffect, useState } from 'react';
import { API } from '../../services/api';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { GameMode } from './GameModes';

interface PlayButtonProps {
  className?: string;
  skipButtonCounter: number;
  selectedGameMode: GameMode
}

export function PlayButton({selectedGameMode, skipButtonCounter, className}: PlayButtonProps) {

  //Dynamic variables
  const [isLoaded, setIsLoaded] = useState<boolean | undefined>(false);
  const [isListening, setIsListening] = useState(false);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);
  const [videoElement, setVideoElement] = useState<YouTubePlayer | null>(null);
  const [attempt, setAttempt] = useState<number>(1);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  //Constant variables
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const youtubePlayerVolume = 10;
  const opts: YouTubeProps['opts'] = {
    height: '100',
    width: '100',
    controls : '0', 
  };
  const onPlayerReady: YouTubeProps['onReady'] = async (event) => {
    setVideoElement(event);
    event.target.setVolume(0);
    await sleep(500);
    event.target.playVideo();
    event.target.pauseVideo();
    event.target.seekTo(seekTo);
    event.target.setVolume(youtubePlayerVolume);
    setIsLoaded(true);
    setIsListening(false);
    console.log("Player READY!");
  }
  const onPlayerEnd: YouTubeProps['onEnd'] = () => {
    console.log("Player END!");
    setIsListening(false);
    videoElement.target.pauseVideo();
    videoElement.target.seekTo(seekTo);
  }
  const onPlayerPlay: YouTubeProps['onPlay'] = () => {
    if(videoId == null || seekTo == null) return;
    console.log("Player PLAY!");
    setIsListening(true);
    setTimeoutPauseVideo()
  }
  const onPlayerPause: YouTubeProps['onPause'] = () => {
    console.log("Player PAUSE!");
    setIsListening(false);
    videoElement.target.seekTo(seekTo);
    clearTimeoutPauseVideo()
  }

  function setTimeoutPauseVideo() {
    const id = setTimeout(() => {
      console.log("Max listening time reached");
      videoElement.target.pauseVideo();
    }, getListeningTime() * 1000);
    setTimeoutId(id);
  }

  function clearTimeoutPauseVideo() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }

  //useEffects
  useEffect(() => {
    console.log("Song refreshed");
    clearTimeoutPauseVideo();
    setIsLoaded(false);
    setIsListening(false);
    getVideoId();
  }, [selectedGameMode, skipButtonCounter]);

  //Api calls
  function getVideoId() {
    setVideoId(undefined);
    const response = API.getInstance().get(selectedGameMode.player_source_api);
    response?.then((data) => {
      setVideoId(data.video_id);
      setSeekTo(data.seek_to);
    });
  }

  //Functions
  function toggleSong() {
    if(isLoaded) {
      if(!isVideoPlaying()) {
        videoElement.target.seekTo(seekTo);
        videoElement.target.playVideo();
      } else {
        videoElement.target.pauseVideo();
      }
    }
  }

  function getListeningTime(): number {
    switch(attempt) {
      case 0:
        return 1;
      case 1:
        return 3;
      case 2:
        return 5;
      case 3:
        return 10;
      case 4:
        return 30;
      case 5:
        return 60;
      case 6:
        return 90;
      default:
        return 0;
    }
  }

  function isVideoPlaying():boolean {
    if(videoElement==null || videoElement.target == null) return false;
    return videoElement.target.playerInfo.playerState === YouTube.PlayerState.PLAYING;
  }

  //Icons
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

  //Render
  return (
    <>
      <button onClick={toggleSong} className={`${isListening ? "animate-wiggle" : ""} ${className}`}>
        {!isLoaded ? loadingIcon() : (isListening ? stopIcon() : playIcon())}
      </button>
      {videoId && <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} onPlay={onPlayerPlay} onPause={onPlayerPause} onEnd={onPlayerEnd} className="absolute" />}
    </>
  );
}
