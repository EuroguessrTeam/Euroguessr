document.body.style.setProperty("overflow", "hidden");
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const blackScreen = document.querySelector(".black-screen");
        blackScreen.style.opacity = 0; // Réduisez l'opacité de l'écran noir
    }, 500);

    setTimeout(function () {
        elements.style.display = "none";
        document.body.style.setProperty("overflow", "auto");
    }, 1000); // Définissez la durée en millisecondes (2.5 secondes ici).

    // Line 1 hidden earlier for mobile display
    const line1 = document.querySelector(".line1");
    setTimeout(function () {
        line1.style.display = "none";
    }, 1500);

    // Masquez les éléments après l'animation
    const elements = document.querySelector(".transition");
    setTimeout(function () {
        elements.style.display = "none";
        document.body.style.setProperty("overflow", "auto");
    }, 2000); // Définissez la durée en millisecondes (2.5 secondes ici).
});
