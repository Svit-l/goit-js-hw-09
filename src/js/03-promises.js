// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// В HTML есть разметка формы,
// в поля которой пользователь будет вводить первую задержку в миллисекундах,
// шаг увеличения задержки для каждого промиса после первого
// и количество промисов которое необходимо создать.

// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз,
//   сколько ввели в поле amount.
//   При каждом вызове передай ей номер создаваемого промиса(position)
//   и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

const delay = document.getElementsByName('delay');
const step = document.getElementsByName('step');
const amount = document.getElementsByName('amount');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const values = { position, delay };
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(values);
      }
      reject(values);
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

// createPromise.then(result => console.log(result)).catch(result => console.log(result));

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

const formSubmit = form.addEventListener('submit', evt => {
  evt.preventDefault();
  const inputDelay = Number(form.delay.value);
  const inputStep = Number(form.step.value);
  const inputAmount = Number(form.amount.value);
  console.log(inputDelay);
  console.log(inputStep);
  console.log(inputAmount);
  let delay = inputDelay;
  for (let i = 0; i < inputAmount; i++) {
    createPromise();
    new Promise(resolve => {
      setTimeout(() => resolve(i), delay);
      console.log(`✅ Fulfilled promise ${i + 1} in ${delay}ms`);
    }, inputDelay);
    delay += inputStep;
  }
});
