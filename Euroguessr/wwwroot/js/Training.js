const progressBar = document.querySelector('.progress');
const duration = 100; // Durée totale en secondes
const stop = 10; //Temps où le lecteur doit s'arrêter
const updateInterval = 1000; // Intervalle de mise à jour en millisecondes
const increment = 1; // Avancement par seconde

let currentTime = 1;
let isPlaying = false;

function startSong() {
    isPlaying = false;
    progressBar.style.transition = "0s";
    progressBar.style.width = "0%";
    currentTime = 0;
    setTimeout(updateProgress, 0);
}

function updateProgress() {

        progressBar.style.transition = "1s linear";
        const progressPercent = (currentTime / duration) * 100 + 1;
        currentTime += increment;
        if (currentTime <= duration && currentTime <= stop) {
            progressBar.style.width = `${progressPercent}%`;
        }
        else {
            progressBar.style.width = `${progressPercent - 1}%`;
        }


    if (currentTime <= duration && currentTime <= stop) {
        setTimeout(updateProgress, updateInterval);
    }
    else {
        progressBar.style.width = `${progressPercent - 1}%`;
    }
}