import React from 'react';
import { Fade } from 'react-awesome-reveal';
import '../styles/privacy/privacy.scss';
import { NavLink } from 'react-router-dom';

export const Help = () => {
    return (
<fieldset>
    <legend>Help</legend>

    <Fade cascade direction='down' damping={0.005} triggerOnce>
        <p>Euroguessr is a free website, where you have to find a corresponding Eurovision song with only the audio.</p>

        <p>Every day at 00:00 UTC, a new Eurovision music will be randomly selected.<br />
            Simply click on the triangle-shaped button to start the music, and with just 1 second of listening, find the
            associated music.<br />
            If you find the corresponding music, great job ! But if you don't, you got extra seconds of listening everytime
            you
            send a wrong aswer.
        </p>

        <p>You can have up to 90 seconds of listening time, with unlimited attempts.</p>

        <p>
            On the <NavLink to='/account' className="link">My account</NavLink> page,
            you can see your previous scores, and the
            number of attempts you've made per day.
        </p>

        <p>Good luck, and enjoy Euroguessr !</p>
    </Fade>

</fieldset>
    );
}