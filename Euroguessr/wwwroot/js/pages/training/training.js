////////////////////////////////////////////////////////////////////////////////////////////
// Note: The youtube video ID is in the html file, in the div with the id "youtube-audio" //
////////////////////////////////////////////////////////////////////////////////////////////

const songs = document.querySelectorAll('.song');
let attemptNumber = 1; // Attempt n°? of the user
let soundVolume = 50; // Volume of the youtube video (0 - 100)

// Html elements to get
let playOrPauseButton = document.getElementById('playerButton');
const playButtonBar = document.getElementById("progress-bar-button");
const remainingTimeTimer = document.getElementById("remaining-time");
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', search);
const skipButton = document.querySelector(".div-skip-button button");
const skipButtonHelpText = document.querySelector(".div-skip-button p")

// Dynamic variables to be defined first
setTextAttemptNumber(attemptNumber, false);
setSkipButtonText(attemptNumber);
changePlayButtonProgressionBar(100);

// Variables for the html/css audio player
const updateInterval = 10; // Update interval in ms of the audio bar progression
let startingTime = Date.now(); // Starting time when the player start the song (global variable)
let currentTime = Date.now(); // Current time of the song (global variable)
let isYoutubePlayerReady = false; // True when the youtube player is ready to stream sound
let isPlaying = false; // True when music is playing, false by default
function secondsOfListening(argAttemptNumber) {
    switch (argAttemptNumber) {
        case 1: return 1;
        case 2: return 2;
        case 3: return 5;
        case 4: return 10;
        case 5: return 30;
        case 6: return 60;
        case 7: return 90;
        default: return duration;
    }
}
let stop = secondsOfListening(attemptNumber);
let duration = 180; // Total duration of the youtube video (set when the youtube api is ready)
let currentPercentOfTheListening;

////////////////////////////////////////
//START SECTION AUDIO PLAYER FUNCTIONS//
////////////////////////////////////////
function onYouTubeIframeAPIReady() {

    console.log("Youtube Iframe API Ready");

    var ctrlq = document.getElementById("youtube-audio");

    var div = document.createElement("div");
    div.setAttribute("id", "youtube-player");
    ctrlq.appendChild(div);

    var player = new YT.Player('youtube-player', {
        height: "0",
        width: "0",
        videoId: ctrlq.dataset.video,
        playerVars: {
            autoplay: ctrlq.dataset.autoplay,
            loop: ctrlq.dataset.loop,
        },
        events: {
            onReady: function (e) {
                player.seekTo(seek_to);
                player.pauseVideo();
                duration = player.getDuration();
                console.log("Durée totale du son : " + duration);
                stop > duration - seek_to ? stop = duration - seek_to : stop = stop; // The song listening time limit cannot be greater than the total duration of the song.
                setTimeLeftTimer(stop);
                resetPlayButtonProgressionBar(100);
                player.setVolume(soundVolume);
                enableSkipButton()
                isYoutubePlayerReady = true;
            },
            onStateChange: function (e) {
                if (e.data === YT.PlayerState.ENDED) {
                    pauseMusic(false);
                }
                if (e.data === YT.PlayerState.PLAYING) {
                    startingTime = Date.now();
                    console.log(Date.now());
                    updateProgress();
                }
            },

            onerror: function (e) {
                console.log(e);
            },

            onabort: function (e) {
                console.log(e);
            }
        }
    });

    function playMusic() {

        console.log("Play");

        setPlayButtonPlayingStyle();
        player.seekTo(seek_to);
        player.setVolume(soundVolume);
        isPlaying = true;
        player.playVideo();
    }

    // Not paused by user = listening time limit over OR youtube video over
    function pauseMusic() {

        console.log("Pause");

        isPlaying = false;

        player.pauseVideo();
        player.seekTo(seek_to);

        resetPlayButtonProgressionBar(currentPercentOfTheListening);
        setTimeLeftTimer(stop);

        setPlayButtonPausingStyle();
    }

    playOrPauseButton.addEventListener('click', function () {
        if (isYoutubePlayerReady) {
            if (!isPlaying) {
                playMusic();
            }
            else {
                pauseMusic();
            }
        }
    });

    function updateProgress() {

        if (isPlaying) {
            setTimeout(updateProgress, updateInterval);
        }

        currentTime = (Date.now() - startingTime) / 1000;
        currentPercentOfTheListening = currentTime * 100 / stop;

        if (currentTime < stop && isPlaying) {
            changePlayButtonProgressionBar(currentPercentOfTheListening);
            setTimeLeftTimer(Math.round(stop - currentTime));
        }
        else {
            if (isPlaying) {
                pauseMusic();
            }
        }
    }
}

//////////////////////////////////////
//END SECTION AUDIO PLAYER FUNCTIONS//
//////////////////////////////////////

////////////////////////////////////
//START SECTION DESIGN PLAY BUTTON//
////////////////////////////////////

const buttonPlayer = document.getElementById('player');
const canvas = document.getElementById("canvas");
let degree = 0;
let amplitude = 20;
let period = 50;
const speed = 1;

canvas.width = buttonPlayer.offsetWidth;
canvas.height = buttonPlayer.offsetHeight;

window.addEventListener("resize", () => {
    canvas.width = buttonPlayer.offsetWidth;
    canvas.height = buttonPlayer.offsetHeight;
});

if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;

    function drawWave() {

        if (isPlaying) {
            if (amplitude <= 20) amplitude += 1;
        } else {
            if (amplitude > 0) amplitude -= 1;
        }

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        // make a triangle
        ctx.moveTo(0, canvas.height / 2);
        for (let x = 0; x <= canvas.width; x++) {
            // calc the courbe of sinus for the wave
            let y = -amplitude * Math.sin((Math.PI / period) * (degree + x));
            ctx.lineTo(x, y + (canvas.height / 2));
        }
        ctx.stroke();
        ctx.closePath();
        // reset memory
        if (degree == 2000) {
            degree = 0;
        }
        degree += speed;
        window.requestAnimationFrame(drawWave);
    }

    drawWave();
}

//////////////////////////////////
//END SECTION DESIGN PLAY BUTTON//
//////////////////////////////////


////////////////////////////////////////
//START SECTION STYLE TIMERS FUNCTIONS//
////////////////////////////////////////

function changePlayButtonProgressionBar(percent) {
    playButtonBar.style.background = `radial-gradient(closest-side, var(--white) 80%, transparent 80% 100%), conic-gradient(var(--primary) ${percent}%, var(--primary-alpha) 0)`;
}

function resetPlayButtonProgressionBar(actualPercent) {
    if (!isPlaying) {
        playButtonBar.style.background = `radial-gradient(closest-side, var(--white) 80%, transparent 80% 100%), conic-gradient(var(--primary) ${actualPercent}%, var(--primary-alpha) 0)`;
        if (actualPercent > 0) {
            setTimeout(resetPlayButtonProgressionBar, 1, actualPercent - 3);
        }
    }
}

function setPlayButtonPlayingStyle() {
    playOrPauseButton.classList.add('active');
}

function setPlayButtonPausingStyle() {
    playOrPauseButton.classList.remove('active');
}

function setTimeLeftTimer(seconds) {
    remainingTimeTimer.innerHTML = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
    if (seconds <= 3) {
        if (seconds == 1 || seconds == 0) {
            remainingTimeTimer.style.color = 'var(--red)';
        }
        else {
            remainingTimeTimer.style.color = 'var(--darkorange)';
        }
    }
    else {
        remainingTimeTimer.style.color = 'var(--black)';
    }
}

function setTextAttemptNumber(actualAttempt, win) {
    if (win) {
        document.querySelector(".attempts-counter").innerHTML = `Great job ! You got it in ${actualAttempt} attempt !`;
    }
    else {
        document.querySelector(".attempts-counter").innerHTML = `Attempt ${actualAttempt}`;
    }
}

function enableSkipButton() {
    skipButton.disabled = false;
}

function setSkipButtonText(actualAttempt) {
    skipButtonHelpText.innerHTML = `+${secondsOfListening(actualAttempt + 1) - secondsOfListening(actualAttempt) } seconds`;
}

//////////////////////////////////////
//END SECTION STYLE TIMERS FUNCTIONS//
//////////////////////////////////////


//////////////////////////////
//START SECTION SEARCH INPUT//
//////////////////////////////
function search(event) {
    let value = event.target.value.toLowerCase();
    songs.forEach(song => {
        let songName = song.querySelector('#title').innerText.toLowerCase();
        let songArtist = song.querySelector('#artist').innerText.toLowerCase();
        let songCountry = song.querySelector('#country').innerText.toLowerCase();
        let songYear = song.querySelector('#year').innerText.toLowerCase();
        if (songName.includes(value) || songArtist.includes(value) || songCountry.includes(value) || songYear.includes(value)) {
            song.style.display = 'block';
        } else {
            song.style.display = 'none';
        }
    });
}
////////////////////////////
//END SECTION SEARCH INPUT//
////////////////////////////

 ///////////////////////////////
//START SECTION SELECT A SONG//
//////////////////////////////
let oldCheckedSong = null;
document.querySelectorAll('.song').forEach(song => {
    song.addEventListener('mouseup', (e) => {
        if (oldCheckedSong === e.currentTarget) return;
        if (oldCheckedSong) oldCheckedSong.classList.toggle('checked');
        e.currentTarget.classList.toggle('checked');
        oldCheckedSong = e.currentTarget;
    });
});
 /////////////////////////////
//END SECTION SELECT A SONG//
////////////////////////////