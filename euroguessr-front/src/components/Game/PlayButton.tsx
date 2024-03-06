import React, { ReactNode } from 'react';
import { API } from '../../services/api';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

interface PlayButtonProps {
  className?: string;
}

interface PlayButtonState {
  isPlaying: boolean;
  videoId?: string;
  isLoaded: boolean;
}

let videoElement: YouTubePlayer = null;

export class PlayButton extends React.Component<PlayButtonProps, PlayButtonState>  {

    constructor(props: PlayButtonProps) {
      super(props);
      this.state = {
        isPlaying: false,
        isLoaded: false,
      };
      this.toggleSong = this.toggleSong.bind(this);
      this.getVideoId();
    }

    async getVideoId() {
      const api = API.getInstance();
      const response = api.get('song/daily');
      // Delay the response to prevent spamming the API
      await response.then((data) => {
        this.setState({ videoId: data.video_id });
        console.log(data.video_id)
      });
    }

    toggleSong() {
      if (this.state.videoId) {
        const isPlaying = !this.state.isPlaying;
        this.setState({ isPlaying: isPlaying }, () => {
          if(isPlaying){
            console.log("Playing");
            console.log(YouTube.PlayerState.PLAYING);
            videoElement.playVideo();
          } else {
            console.log("Stopped");
            videoElement.pauseVideo();
          }
        });
      }
    }

    loadingIcon(): ReactNode {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="white" className="w-[65%] h-[65%] animate-spin">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )
    }

    playIcon(): ReactNode {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-[65%] h-[65%] ml-[6%]">
          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
        </svg>
      )
    }

    stopIcon(): ReactNode {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[65%] h-[65%]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
        </svg>
      )
    }

    youtubePlayer() {
      const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.seekTo(10);
        event.target.pauseVideo();
        event.target.playVideo();
        event.target.setVolume(30);
        videoElement = event.target;
      }

      const opts: YouTubeProps['opts'] = {
        height: '0',
        width: '0',
      };
    
      return (
        <>
          <YouTube videoId="3JUuQ7M4JHk" opts={opts} onReady={onPlayerReady} className="absolute" />
        </>
      )
    }

    render() {
      const { className } = this.props;

      return (
        <>
          <button onClick={this.toggleSong} className={`${className} ${this.state.isPlaying ? "animate-wiggle" : ""}`}>
            {!this.state.isLoaded ? this.loadingIcon() : (this.state.isPlaying ? this.stopIcon() : this.playIcon()) }
          </button>
          <this.youtubePlayer />
        </>
      );
    }

}