const minTens = document.querySelector(".timer__minute__tens");
const minOnes = document.querySelector(".timer__minute__ones");
const secHundreds = document.querySelector(".timer__second__hundreds");
const secTens = document.querySelector(".timer__second__tens");
const pauseBtnText = document.querySelector(".pause");
let btnRunningObj = {
  pomodoro: false,
  break: false,
  pause: false,
  reset: false
};
let pauseNums = {
  minTens: 0,
  minOnes: 0,
  secHundreds: 0,
  secTens: 0
};
let timer;
function updateMinTens() {
  minTens.textContent = parseInt(minTens.textContent) - 1;
}
function updateMinOnes() {
  if (minOnes.textContent === "0") {
    minOnes.textContent = 9;
    updateMinTens();
  } else {
    minOnes.textContent = parseInt(minOnes.textContent) - 1;
  }
}
function updateSecHundreds() {
  if (secHundreds.textContent === "0") {
    secHundreds.textContent = 5;
    updateMinOnes();
  } else {
    secHundreds.textContent = parseInt(secHundreds.textContent) - 1;
  }
}
function updateSecTens() {
  if (
    secTens.textContent === "0" &&
    secHundreds.textContent === "0" &&
    minOnes.textContent === "0" &&
    minTens.textContent === "0"
  ) {
    clearInterval(timer);
    let audio = new Audio("./sounds/chime.mp3");
    audio.play();
  } else if (secTens.textContent === "0") {
    secTens.textContent = 9;
    updateSecHundreds();
  } else {
    secTens.textContent = parseInt(secTens.textContent) - 1;
  }
}
function resetTimer() {
  clearInterval(timer);
  pauseBtnText.value = "Pause";
  btnRunningObj.pomodoro = false;
  btnRunningObj.break = false;
  btnRunningObj.pause = false;
  btnRunningObj.reset = true;
  minTens.textContent = 0;
  minOnes.textContent = 0;
  secHundreds.textContent = 0;
  secTens.textContent = 0;
}
function runPause() {
  clearInterval(timer);
  btnRunningObj.pomodoro = false;
  btnRunningObj.break = false;
  if (btnRunningObj.reset === true) return;
  if (
    secTens.textContent === "0" &&
    secHundreds.textContent === "0" &&
    minOnes.textContent === "0" &&
    minTens.textContent === "0"
  ) {
    return;
  } else if (btnRunningObj.pause === false) {
    btnRunningObj.pause = true;
    pauseNums.minTens = minTens.textContent;
    pauseNums.minOnes = minOnes.textContent;
    pauseNums.secHundreds = secHundreds.textContent;
    pauseNums.secTens = secTens.textContent;
    pauseBtnText.value = "Resume";
  } else {
    btnRunningObj.pause = false;
    minTens.textContent = pauseNums.minTens;
    minOnes.textContent = pauseNums.minOnes;
    secHundreds.textContent = pauseNums.secHundreds;
    secTens.textContent = pauseNums.secTens;
    pauseBtnText.value = "Pause";
    timer = setInterval(updateSecTens, 1000);
  }
}
function runBreak() {
  if (btnRunningObj.break === true) return;
  if (btnRunningObj.pause === true) {
    minTens.textContent = pauseNums.minTens;
    minOnes.textContent = pauseNums.minOnes;
    secHundreds.textContent = pauseNums.secHundreds;
    secTens.textContent = pauseNums.secTens;
  }
  if (btnRunningObj.break === false) {
    minTens.textContent = 0;
    minOnes.textContent = 5;
    secHundreds.textContent = 0;
    secTens.textContent = 0;
  }
  btnRunningObj.break = true;
  btnRunningObj.pomodoro = false;
  btnRunningObj.pause = false;
  btnRunningObj.reset = false;
  clearInterval(timer);
  timer = setInterval(updateSecTens, 1000);
}
function runPomodoro() {
  if (btnRunningObj.pomodoro === true) return;
  if (btnRunningObj.pause === true) {
    minTens.textContent = pauseNums.minTens;
    minOnes.textContent = pauseNums.minOnes;
    secHundreds.textContent = pauseNums.secHundreds;
    secTens.textContent = pauseNums.secTens;
  }
  if (btnRunningObj.pomodoro === false) {
    minTens.textContent = 2;
    minOnes.textContent = 5;
    secHundreds.textContent = 0;
    secTens.textContent = 0;
  }
  btnRunningObj.pomodoro = true;
  btnRunningObj.break = false;
  btnRunningObj.pause = false;
  btnRunningObj.reset = false;
  clearInterval(timer);
  timer = setInterval(updateSecTens, 1000);
}
function assignBtnClicks() {
  const buttons = document.querySelectorAll("input");
  buttons.forEach(input => {
    input.addEventListener("click", () => {
      if (input.classList.contains("pomodoro")) {
        runPomodoro();
      } else if (input.classList.contains("break")) {
        runBreak();
      } else if (input.classList.contains("pause")) {
        runPause();
      } else if (input.classList.contains("reset")) {
        resetTimer();
      } else {
        alert("Something went wrong.");
      }
    });
  });
}
assignBtnClicks();
