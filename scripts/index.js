const minTens = document.querySelector(".timer__minute__tens");
const minOnes = document.querySelector(".timer__minute__ones");
const secHundreds = document.querySelector(".timer__second__hundreds");
const secTens = document.querySelector(".timer__second__tens");
let btnRunningObj = {
  pomodoro: false,
  break: false,
  pause: false,
  reset: false
};
let btnPauseObj = {};
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
  // minTens.textContent = 2;
  // minOnes.textContent = 5;
  // secHundreds.textContent = 0;
  // secTens.textContent = 1;
  console.log("Working!");
}

function runPomodoro() {
  if (btnRunningObj.pomodoro === true) return;
  btnRunningObj.pomodoro = true;
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
