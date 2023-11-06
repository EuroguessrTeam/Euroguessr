////////////////////////////////////////////////////////////////////////////////////////////
// Note: The youtube video ID is in the html file, in the div with the id "youtube-audio" //
////////////////////////////////////////////////////////////////////////////////////////////

const attemptNumber = 10; // Number of guess send by the user
const seek_to = 120; // Integer indicating the timecode at which to start the youtube video (for example "seek_to = 5" starts the youtube video at 00:05)
let stop = 4; // Maximum listening time
let duration; // Total duration of the youtube video (set when the youtube api is ready)
let soundVolume = 50; // Volume of the youtube video (0 - 100)
let currentPercentOfTheListening;

// Html elements to get
let playOrPauseButton = document.getElementById('playerButton');
const playButtonBar = document.getElementById("progress-bar-button");
const remainingTimeTimer = document.getElementById("remaining-time");

// Dynamic variables to be defined first
document.querySelector(".attempts-counter").innerHTML = `Attempt ${attemptNumber}`;
changePlayButtonProgressionBar(100);

// Variables for the html/css audio player
const updateInterval = 10; // Update interval in ms of the audio bar progression
let startingTime = Date.now(); // Starting time when the player start the song (global variable)
let currentTime = Date.now(); // Current time of the song (global variable)
let isYoutubePlayerReady = false; // True when the youtube player is ready to stream sound
let isPlaying = false; // True when music is playing, false by default
var player;

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
                duration = player.getDuration();
                stop > duration - seek_to ? stop = duration - seek_to : stop = stop; // The song listening time limit cannot be greater than the total duration of the song.
                changeTimeLeftTimer(stop);
                changePlayButtonProgressionBar(0);
                player.setVolume(soundVolume);
                player.setPlaybackQuality("small");
                player.playVideo();
                player.pauseVideo();
                player.seekTo(seek_to);
                isYoutubePlayerReady = true;
            },
            onStateChange: function (e) {
                if (e.data === YT.PlayerState.ENDED) {
                    pauseMusic(false);
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
        player.playVideo();

        isPlaying = true;
        startingTime = Date.now();

        updateProgress();
    }

    // Not paused by user = listening time limit over OR youtube video over
    function pauseMusic() {

        console.log("Pause");

        isPlaying = false;

        player.pauseVideo();
        player.seekTo(seek_to);

        resetPlayButtonProgressionBar(currentPercentOfTheListening);
        changeTimeLeftTimer(stop);

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
            changeTimeLeftTimer(Math.round(stop - currentTime));
        }
        else {
            if (isPlaying) {
                pauseMusic(false);
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
            setTimeout(resetPlayButtonProgressionBar, 1, actualPercent - 1);
        }
    }
}

function setPlayButtonPlayingStyle() {
    playOrPauseButton.classList.add('active');
}

function setPlayButtonPausingStyle() {
    playOrPauseButton.classList.remove('active');
}

function changeTimeLeftTimer(seconds) {
    remainingTimeTimer.innerHTML = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
    if (seconds <= 3) {
        if (seconds == 1 || seconds == 0) {
            remainingTimeTimer.style.color = 'darkred';
        }
        else {
            remainingTimeTimer.style.color = 'red';
        }
    }
    else {
        remainingTimeTimer.style.color = 'black';
    }
}

//////////////////////////////////////
//END SECTION STYLE TIMERS FUNCTIONS//
//////////////////////////////////////
