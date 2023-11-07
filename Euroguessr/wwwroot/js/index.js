const button = document.getElementById('playerButton');
const searchBar = document.getElementById('searchBar');
const songs = document.querySelectorAll('.song');
const canvas = document.getElementById("canvas");
const player = document.getElementById('player');
const speed = 1;
let sound = false;
let degree = 0;
let amplitude = 20;
let period = 50;

button.addEventListener('click', () => {
    button.classList.toggle('active');
    sound = !sound;
});

searchBar.addEventListener('keyup', search);

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


canvas.width = player.offsetWidth;
canvas.height = player.offsetHeight;

window.addEventListener("resize", () => {
    canvas.width = player.offsetWidth;
    canvas.height = player.offsetHeight;
});

if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;

    function drawWave() {

        if (sound) {
            if (amplitude <= 20) amplitude += 1;
        } else {
            if (amplitude > 0) amplitude -= 1;
        }

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
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