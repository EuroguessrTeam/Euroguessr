// Function called when the user click on the skip button or when the user submit a wrong answer
function addOneAttemptAction() {
    attemptNumber += 1; // Add 1 attempt to the user

    stop = secondsOfListening(attemptNumber);

    setTextAttemptNumber(attemptNumber, false);
    setTimeLeftTimer(stop);
    setSkipButtonText(attemptNumber);
}

var buttons = document.querySelectorAll("div.song label div.send button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        const response = fetch(url_submit_song,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(button.value)
            }
        ).then(res => res.json())
            .then(response => treatAPIResponseSongSubmited(response))
            .catch(error => console.error('An unexpected error occured', error));
    });
});

// Function that determine what to do when the server respond to the user guess
function treatAPIResponseSongSubmited(response) {
    if (response == "Wrong") {
        console.log("Wrong answer, +1 attempt");
        addOneAttemptAction();
        wrongAnswerAction();
    }
    else {
        console.log("Right answer, GG !");
        endGame();
    }
}

function wrongAnswerAction() {
    document.querySelector(".form div.songs div.song label:has(input:checked)").style = "background-color: var(--red); border: 2px solid var(--red);";
    let selectedButton = document.querySelector(".form div.songs div.song label:has(input:checked) button");
    selectedButton.innerHTML = "×";
    selectedButton.disabled = true;
}

function endGame() {
    document.querySelector(".form div.songs div.song label:has(input:checked)").style = "background-color: var(--green); border: 2px solid var(--green);";
    document.querySelector(".form div.songs div.song label:has(input:checked) button").innerHTML = "✓";
    buttons.forEach(button => {
        button.disabled = true;
    });
    setTextAttemptNumber(attemptNumber, true);
    document.querySelector(".div-skip-button button").disabled = true;
}
