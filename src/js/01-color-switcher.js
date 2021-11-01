const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onButtonClick = () => {
  const color = getRandomHexColor();
  // console.log(color);
  document.body.style.backgroundColor = color;
};

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    //   const bodyStyle =
    onButtonClick();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
});
