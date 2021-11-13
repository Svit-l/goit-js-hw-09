// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');
const buttonStart = document.querySelector('button[data-start]');
const inputRef = document.querySelector('#datetime-picker');

// console.log(dateNow);
// console.log(daysValue.innerHTML);
// console.log(hoursValue.innerHTML);
// console.log(minutesValue.innerHTML);
// console.log(secondsValue.innerHTML);
// console.log(buttonStart.innerHTML);
// console.log(inputRef.innerHTML);
// daysValue.innerHTML = '55';
buttonStart.setAttribute('disabled', 'true');
let intervalId = null;
let selectedDay = null;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDay = selectedDates[0].getTime();
    if (selectedDay <= Date.now()) {
      //   window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      // console.log(selectedDates[0]);
      buttonStart.removeAttribute('disabled');
      const deltaTime = selectedDay - Date.now();
      const time = convertMs(deltaTime);
      updateClock(time);
    }
  },
};

flatpickr(inputRef, options);

// console.log();
// onClose();
// // const dateNow = Object.values(options);
// console.log(Object.values(options));
buttonStart.addEventListener('click', onStartClick);

function onStartClick() {
  if (isActive) {
    return;
  }

  isActive = true;
  intervalId = setInterval(() => {
    if (selectedDay <= Date.now()) {
      clearInterval(intervalId);

      buttonStart.setAttribute('disabled', true);
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
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
  console.log(`${days}:${hours}:${minutes}:${seconds}`);
}
