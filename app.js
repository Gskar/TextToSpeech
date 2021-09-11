const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const repeatBtn = document.querySelector("#repeatbtn");
let active = false;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

repeatBtn.addEventListener("click", () => {
  if (active === false) {
    repeatBtn.textContent = "Voice Repeat is Active";
    active = true;
  } else if (active === true) {
    repeatBtn.textContent = "Voice Repeat is Inactive";
    active = false;
  }
});

recognition.onstart = function () {
  document.querySelector("h4").textContent = "Voice Is On";
};

recognition.onresult = function (event) {
  const current = event.resultIndex;

  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  readOutLoud(transcript);
};

btn.addEventListener("click", () => {
  recognition.start();
});

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();
  if (active === false) {
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    document.querySelector("h4").textContent = "Voice Is Off";
    window.speechSynthesis.speak(speech);
  } else {
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    document.querySelector("h4").textContent = "Voice Is Off";
    window.speechSynthesis.speak(speech);
  }
}
