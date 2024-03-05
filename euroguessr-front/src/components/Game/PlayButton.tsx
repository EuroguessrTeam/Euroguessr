import React, { ReactNode } from 'react';
import { API } from '../../services/api';

interface PlayButtonProps {
  className?: string;
}

interface PlayButtonState {
  isPlaying: boolean;
}

export default class PlayButton extends React.Component<PlayButtonProps, PlayButtonState>  {

    constructor(props: PlayButtonProps) {
      super(props);
      this.state = {
        isPlaying: false
      };
      this.toggleSong = this.toggleSong.bind(this);
      const api = API.getInstance();
      const response = api.get('song/daily');
      console.log(response);
      response.then((data) => {
        console.log(data);
      });
    }

    toggleSong() {
      this.setState(prevState => ({
        isPlaying: !prevState.isPlaying
      }));
      console.log(this.state.isPlaying);
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

    render() {
        const {className} = this.props;

        return (
            <button onClick={this.toggleSong} className={`${className}`}>
              {this.state.isPlaying ? this.stopIcon() : this.playIcon()}
            </button>
        );
    }

}