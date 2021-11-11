import { Notify } from 'notiflix';

const refs = {
  formSubmit: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};
// let amount = 0;
// let delay = 0;
// let step = 0;

refs.formSubmit.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  let amount = Number(e.currentTarget.elements.amount.value);
  let delay = Number(e.currentTarget.elements.delay.value);
  let step = Number(e.currentTarget.elements.step.value);

  e.preventDefault();

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
