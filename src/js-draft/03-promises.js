// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// В HTML есть разметка формы,
// в поля которой пользователь будет вводить первую задержку в миллисекундах,
// шаг увеличения задержки для каждого промиса после первого
// и количество промисов которое необходимо создать.

// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз,
//   сколько ввели в поле amount.
//   При каждом вызове передай ей номер создаваемого промиса(position)
//   и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

const form = document.querySelector('.form');
// console.log(form.delay.name);
// console.log(Object.values(form));

// const allInpus = document.querySelectorAll('input');
// const allInpus = document.getElementsByName('input');
// const delay = allInpus[0];
// const step = allInpus[1];
// const amount = allInpus[2];

// const delay = form.delay;
// const step = form.step;
// const amount = form.amount;

// console.log(allInpus);
// console.log(delay.type);
// console.log(delay.name);
// console.log(formDelay === delay);
// console.log(amount.name);

// form.addEventListener('submit', evt => {
//   evt.preventDefault();

const inputAmount = Number(form.amount.value);
//   // console.log(firstDelay);
//   // console.log(delayStep);
//   // console.log(inputAmount);
//   for (let i = 0; i < inputAmount; i++) {
//     createPromise(position, delay);
//     return (position += i + 1);
//   }
// });
const firstDelay = Number(form.delay.value);
let delay = firstDelay;
let position = 1;
function createPromise(position, delay) {
  //   const shouldResolve = Math.random() > 0.3;

  const delayStep = Number(form.step.value);

  for (let i = 0; i < inputAmount; i++) {
    new Promise((resolve, reject) => {
      console.log(delay);
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve;
          // (console.log(`✅ Fulfilled promise ${i + 1} in ${delay}ms`));
        } else {
          reject;
          // (console.log(`❌ Rejected promise ${i + 1} in ${delay}ms`));
        }
        delay += delayStep;
      }, delay);
    });
  }
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

// const shouldResolve = Math.random() > 0.3;
// function createPromise(position, delay) {
//   setTimeout(() => {
//     if (shouldResolve) {
//       for (let i = 0; i < 5; i++) {
//         console.log(position);
//         position = i + 1;
//       }
//     } else {
//     }
//   }, delay);
// }
// // });

// createPromise(5, 2000);

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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// let position = 5;
// let delay = 2000;

// const shouldResolve = Math.random() > 0.3;
// function createPromise(position, delay) {
//   setTimeout(() => {
//     if (shouldResolve) {
//       for (let i = 0; i < 5; i++) {
//         console.log(position);
//         position = i + 1;
//       }
//     } else {
//     }
//   }, delay);
// }
// // });

// createPromise(5, 2000);
