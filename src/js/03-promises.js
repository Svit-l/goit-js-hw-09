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

console.log(delay);
console.log(step);
console.log(amount);

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// const promise = createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
