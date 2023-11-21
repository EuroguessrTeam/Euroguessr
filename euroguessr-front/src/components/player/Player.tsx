import React from "react";
import '../../styles/player/player.scss';
import { Wave } from "./Wave";

export const Player = () => {
    return (
        <div className='player'>
            <Wave />
        </div>
    );
}