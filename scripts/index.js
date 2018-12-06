const minTens = document.querySelector(".timer__minute__tens");
const minOnes = document.querySelector(".timer__minute__ones");
const secHundreds = document.querySelector(".timer__second__hundreds");
const secTens = document.querySelector(".timer__second__tens");
let btnRunningObj = {
  pomodoro: false,
  break: false,
  pause: false
};
let pauseNums = {
  minTens: 2,
  minOnes: 5,
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
  } else if (secTens.textContent === "0") {
    secTens.textContent = 9;
    updateSecHundreds();
  } else {
    secTens.textContent = parseInt(secTens.textContent) - 1;
  }
}

function runPause() {
  console.log("Working!");
}

function runBreak() {
  console.log("Working!");
}

function resetTimer() {
  clearInterval(timer);
  btnRunningObj.pomodoro = false;
  minTens.textContent = 2;
  minOnes.textContent = 5;
  secHundreds.textContent = 0;
  secTens.textContent = 0;
}

function runPause() {
  clearInterval(timer);
  btnRunningObj.break = false;
  btnRunningObj.pomodoro = false;
  btnRunningObj.pause = true;
  pauseNums.minTens = minTens.textContent;
  pauseNums.minOnes = minOnes.textContent;
  pauseNums.secHundreds = secHundreds.textContent;
  pauseNums.secTens = secTens.textContent;
}

function runBreak() {
  if (btnRunningObj.break === true) return;
  if (btnRunningObj.pause === true) {
    minTens.textContent = pauseNums.minTens;
    minOnes.textContent = pauseNums.minOnes;
    secHundreds.textContent = pauseNums.secHundreds;
    secTens.textContent = pauseNums.secTens;
  } else {
    minTens.textContent = 0;
    minOnes.textContent = 5;
    secHundreds.textContent = 0;
    secTens.textContent = 0;
  }
  btnRunningObj.break = true;
  btnRunningObj.pause = false;
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
  } else {
    minTens.textContent = 2;
    minOnes.textContent = 5;
    secHundreds.textContent = 0;
    secTens.textContent = 0;
  }
  btnRunningObj.pomodoro = true;
  btnRunningObj.pause = false;
  clearInterval(timer);
  timer = setInterval(updateSecTens, 1000);
}

(function assignBtnClicks() {
  const buttons = document.querySelectorAll("input");
  buttons.forEach(input => {
    input.addEventListener("click", () => {
      if (input.value === "Pomodoro") {
        runPomodoro();
      } else if (input.value === "Break") {
        runBreak();
      } else if (input.value === "Pause") {
        runPause();
      } else if (input.value === "Reset") {
        resetTimer();
      } else {
        alert("Something went wrong.");
      }
    });
  });
})();
