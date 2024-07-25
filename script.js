let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 10);
    showButton('STOP');
}

function stop() {
    clearInterval(timerInterval);
    showButton('START');
}

function reset() {
    clearInterval(timerInterval);
    display.innerHTML = '00:00:00';
    elapsedTime = 0;
    laps.innerHTML = '';
    showButton('START');
}

function lap() {
    const li = document.createElement('li');
    li.innerText = timeToString(elapsedTime);
    laps.appendChild(li);
}

function showButton(buttonKey) {
    if (buttonKey === 'START') {
        startStopButton.innerHTML = 'Start';
        startStopButton.removeEventListener('click', stop);
        startStopButton.addEventListener('click', start);
    } else {
        startStopButton.innerHTML = 'Stop';
        startStopButton.removeEventListener('click', start);
        startStopButton.addEventListener('click', stop);
    }
}

startStopButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
