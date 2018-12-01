const buttons = document.querySelectorAll("input");
const timerText = document.getElementsByClassName("timer__text");

function runPomodoro() {
  // Stopped working here for the evening
}

(function assignBtnClicks() {
  // IIFE immediately invoked
  buttons.forEach(input => {
    input.addEventListener("click", () => {
      if (input.value === "Pomodoro") {
        runPomodoro();
        console.log("!");
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
