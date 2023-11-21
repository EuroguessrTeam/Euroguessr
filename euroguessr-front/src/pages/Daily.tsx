import React from "react";
import '../styles/daily/daily.scss';
import { Player } from "../components/player/Player";

export const Daily = () => {
    return (
        <fieldset className="daily">
            <legend>Daily</legend>

            <Player />

        </fieldset>
    );
}