const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");

let interval;
let totalTime = 7200;
let workSession = 3000; 
let restTime = 600; 
let isResting = false; 

function updateTimer() {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

    timerEl.innerHTML = formattedTime;
}

function startTimer() {
    if (!interval) {
        interval = setInterval(() => {
            if (totalTime > 0) {
                totalTime--;
                workSession--;

                updateTimer();

                
                if (workSession === 0 && !isResting) {
                    isResting = true;
                    totalTime += restTime; 
                    workSession = 3000; 
                    alert("Istirahat 10 menit dimulai!");
                }

                
                if (isResting && workSession === 2940) {
                    isResting = false;
                    alert("Waktunya kembali bekerja!");
                }
            } else {
                clearInterval(interval);
                alert("Waktu habis!");
                resetTimer();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    totalTime = 7200; // Reset ke 2 jam
    workSession = 3000; // Reset sesi kerja ke 50 menit
    isResting = false;
    updateTimer();
}

// Event Listener untuk tombol
startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);

// Jalankan pembaruan awal saat halaman dimuat
updateTimer();
