// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

const startBtnRef = document.querySelector('button[data-start]');
const inputRef = document.querySelector('#datetime-picker');

startBtnRef.setAttribute('disabled', true);

let intervalId = null;
let selectedDay = null;
let isActive = false;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDay = selectedDates[0].getTime();
    if (selectedDay <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    startBtnRef.removeAttribute('disabled');
    const deltaTime = selectedDay - Date.now();
    const time = convertMs(deltaTime);
    updateClock(time);
  },
});

startBtnRef.addEventListener('click', onStartClick);

function onStartClick() {
  if (isActive) {
    return;
  }

  isActive = true;
  intervalId = setInterval(() => {
    if (selectedDay <= Date.now()) {
      clearInterval(intervalId);

      startBtnRef.setAttribute('disabled', true);
      return;
    }
    const deltaTime = selectedDay - Date.now();
    const time = convertMs(deltaTime);
    updateClock(time);
  }, 1000);
}

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
function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClock({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
  console.log(`${days}:${hours}:${minutes}:${seconds}`);
}
