const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.btnStart.addEventListener('click', OnBtnStartClick);
refs.btnStop.addEventListener('click', OnBtnStopClick);

function OnBtnStartClick() {
  refs.btnStart.setAttribute('disabled', 'disabled');

  timerId = setInterval(() => {
    let color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
}

function OnBtnStopClick() {
  clearInterval(timerId);
  refs.btnStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
