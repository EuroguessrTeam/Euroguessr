import React from "react";
import '../../styles/player/player.scss';
import { Wave } from "./Wave";
import { useState, useEffect } from 'react';
import '../../scripts/player/player.js';

export const Player = () => {

    const [songs, setSongs] = useState<any[]>([]);
    useEffect(() => {
        fetch('https://localhost:7079/songs')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setSongs(data);
            });
    }, []);

    return (
        <div className='player'>
            <Wave />

            <h1 className="text-center roboto-font guess-the-song-text flex mainTitle">
                Guess the song
            </h1>
            <h3 className="text-center roboto-font attempts-counter flex attemptText">
                Attempt
            </h3>

            <div data-video="@Model.SongToGuess.video_id" data-autoplay="0" data-loop="0" id="youtube-audio"></div>

            <div className="flex">
                <h3 className="remaining-time">Song is loading...</h3>
            </div>
            
            <div className="div-play-button flex">
                <div className="player" id="player">
                    <div className="progress-bar-button">
                        <div className="play-button" id="playerButton">
                            <div className="icon">
                                <div className="part left"></div>
                                <div className="part right"></div>
                            </div>
                        </div>
                    </div>
                    <canvas id="canvas"></canvas>
                </div>
            </div>

            <div className="action-buttons flex">

                <div className="left-buttons flex">

                    <div className="div-skip-button flex">
                        <button className="button skip-button" disabled /*onclick="addOneAttemptAction();"*/>Skip</button>
                        <p className="skip-button-text"></p>
                    </div>

                </div>

                <div className="right-buttons flex">
                    <button className="button next-button">Next
                        song</button>
                </div>

            </div>

            
            <div className="form">
                <div className="searchBoxContainer">
                    <div className="searchBox">
                        <label htmlFor="search">Search your guess</label>
                        <div className="search">
                            <input type="text" className="searchBar" placeholder="Type a song ..." />
                            <span>🔍</span>
                        </div>
                    </div>
                </div>
                <div className="songs">

                    {songs.map((song) => (
                        <div className="song">
                            <label htmlFor="@song.id" >
                                <input type="radio" id="@music.id" name="choice" />
                                <div className="songContainer">
                                    <div className="thumbnail">
                                        <img data-src="https://i.ytimg.com/vi/@music.video_id/hq720.jpg" alt="Eat Your Salad" />
                                    </div>
                                    <div className="songInfo">
                                        <h3 className="title">{song.song_name}</h3>
                                        <p className="artist">{song.artist_name}</p>
                                    </div>
                                    <div className="songDetails">
                                        <p className="country">Country: {song.country}</p>
                                        <p className="year">Year: {song.year}</p>
                                    </div>
                                </div>
                                <div className="send">
                                    <button>Send</button>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

}
