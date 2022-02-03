// import notification libruary
import Notiflix from 'notiflix';

// creates object refers on HTML elements
const refs = {
  formCreatePromise: document.querySelector('.form'),
  collectionElementOfForm: document.querySelector('.form').children,
  btnSubmitForm: document.querySelector('.form [type="submit"]'),
  inputDelay: document.querySelector('.form [name="delay"]'),
  inputStep: document.querySelector('.form [name="step"]'),
  inputAmount: document.querySelector('.form [name="amount"]'),
  collectionInputElementsOfForm: document.querySelectorAll('.form label'),
};

//format form style
formatForm();

// add Listener on submit button of the form
refs.formCreatePromise.addEventListener('submit', btnSubmitFormSubmitListener);

//btnSubmitFormSubmitListener - listener
//do: - prevent default reaction on "submit" event
//    - create a loop of promise realization with arg { position, delay }
function btnSubmitFormSubmitListener(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  for (let i = 0; i < amount.value; i += 1) {
    const delayOnStep = parseInt(step.value) * i + parseInt(delay.value);
    createPromise(i + 1, delayOnStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

//createPromise
//do:   - create promise with setTimeout, delay = delay;
//in:   - position,
//      - delay
//out:  - promise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
  return promise;
}

//formatForm
//do: -format HTML page
function formatForm() {
  refs.formCreatePromise.style.display = 'flex';
  refs.formCreatePromise.style.flexWrap = 'wrap';
  refs.formCreatePromise.style.alignItems = 'flex-end';
  refs.formCreatePromise.style.justifyContent = 'space-between';
  refs.formCreatePromise.style.width = '50%';
  refs.btnSubmitForm.style.marginTop = "10px";
  Array.from(refs.collectionElementOfForm).forEach( (item) => {
    item.style.minWidth = "120px";
    item.style.width = "20%";
  });
}