import { Notify } from 'notiflix/build/notiflix-notify-aio';
// В HTML есть разметка формы,
// в поля которой пользователь будет вводить первую задержку в миллисекундах,
// шаг увеличения задержки для каждого промиса после первого
// и количество промисов которое необходимо создать.

// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз,
//   сколько ввели в поле amount.
//   При каждом вызове передай ей номер создаваемого промиса(position)
//   и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

const form = document.querySelector('.form');

form.addEventListener('submit', evt => {
  evt.preventDefault();

  let delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);
  // console.log(delay);
  // console.log(step);
  // console.log(amount);
  for (let i = 1; i <= amount; i++) {
    let position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else reject({ position, delay });
    }, delay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
