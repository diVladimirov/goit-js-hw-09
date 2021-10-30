// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('input#datetime-picker');

const btnStart = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectDate = selectedDates[0];
    const currentDate = new Date();

    // console.log(selectDate.getTime());
    // console.log(currentDate.getTime());
    if (selectDate.getTime() > currentDate.getTime()) {
      btnStart.removeAttribute('disabled');
    } else {
      window.alert('Please choose a date in the future');
    }

    setInterval(() => {
      const deltaTime = currentDate.getTime() - selectDate.getTime();
      convertMs(deltaTime);
    }, 1000);
  },
};

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  console.log(1);
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
  return padStart();
}
