function HideShowFunction() {
    var x = document.getElementById("HideShowContent");
    var y = document.getElementById("ButtonHideShowContent");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.innerHTML = "Hide";
    } else {
        x.style.display = "none";
        y.innerHTML = "Show";
    }
}