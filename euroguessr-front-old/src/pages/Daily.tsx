import React from "react";
import '../styles/daily/daily.scss';
import { Player } from "../components/player/Player";
import { API } from "../services/api";

export const Daily = () => {

    const api = API.getInstance();
    const test = api.get("songs");
    console.log(test);

    return (
        <fieldset className="daily">
            <legend>Daily</legend>

            <h1>Test</h1>

            <Player />

        </fieldset>
    );
}