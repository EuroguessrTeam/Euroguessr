function skipButtonAction() {
    attemptNumber += 1; // Add 1 attempt to the user

    stop = secondsOfListening(attemptNumber);

    setTextAttemptNumber(attemptNumber);
    setTimeLeftTimer(stop);
    setSkipButtonText(attemptNumber);
}
