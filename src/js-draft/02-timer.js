// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};
const calendar = new flatpickr('#datetime-picker', options);

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};
// const timeLeftObf = {};
let selectedDate = 0;
let timeLeft = 0;
let id = null;

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStart);

calendar.config.onClose.push(function (selectedDates) {
  if (selectedDates[0].getTime() <= Date.now()) {
    refs.startBtn.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }
  refs.startBtn.removeAttribute('disabled');
  selectedDate = selectedDates[0].getTime();
});

function onTimer() {
  timeLeft = selectedDate - Date.now();
  stopTimeOut(timeLeft);
  const convertObj = convertMs(timeLeft);
  if (timeLeft < 0) {
    return;
  }
  showDate(convertObj);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopTimeOut(sec) {
  if (sec < 1000) {
    Notify.success('Time is out');
    clearTimeout(id);
    refs.input.removeAttribute('disabled');
    return;
  }
  addTimeOut();
}

function showDate(time) {
  refs.days.textContent = addLeadingZero(time.days);
  refs.hours.textContent = addLeadingZero(time.hours);
  refs.minutes.textContent = addLeadingZero(time.minutes);
  refs.seconds.textContent = addLeadingZero(time.seconds);
}

function addTimeOut() {
  id = setTimeout(onTimer, 1000);
}

function onStart() {
  addTimeOut();
  refs.input.setAttribute('disabled', true);
  refs.startBtn.setAttribute('disabled', true);
}
