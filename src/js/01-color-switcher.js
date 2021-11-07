// поиск элементов
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
//
let timerId = null;
// кнопка стоп - не активна
stopBtn.setAttribute('disabled', 'true');

// генерация случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// генерирование цвета
const onButtonClick = () => {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
};

// нажатие на кнопку старт - запуск изменения цвета через интервал 1с.
// кнопка старт - не активна
startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    onButtonClick();
  }, 1000);
});

// нажатие на кнопку стоп - остановка изменения цвета
// кнопка стоп - не активна
stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
});
