// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('input#datetime-picker');

const btnStart = document.querySelector('button[data-start]');

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
// const days = document.querySelector('span[data-days]');
// const hours = document.querySelector('span[data-hours]');
// const minutes = document.querySelector('span[data-minutes]');
// const seconds = document.querySelector('span[data-seconds]');

let selectDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    const currentDate = Date.now();

    if (selectDate.getTime() > currentDate) {
      btnStart.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  timerId = setInterval(() => {
    const deltaTime = selectDate.getTime() - Date.now();
    // convertMs(deltaTime);
    console.log('разница', deltaTime);
    const dif = convertMs(deltaTime);
    // console.log(dif);
    // days.textContent = addLeadingZero(dif.days);
    // hours.textContent = addLeadingZero(dif.hours);
    // minutes.textContent = addLeadingZero(dif.minutes);
    // seconds.textContent = addLeadingZero(dif.seconds);

    for (const [key, value] of Object.entries(dif)) {
      refs[key].textContent = addLeadingZero(value);
    }
    if (deltaTime <= 1000) {
      clearInterval(timerId);
      Notiflix.Notify.info('Timer end');
    }
  }, 1000);
}

init();
function init() {
  btnStart.setAttribute('disabled', 'disabled');
}

flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
