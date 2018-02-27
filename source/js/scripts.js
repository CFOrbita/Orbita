var navMain = document.querySelector('.nav');
var navToggle = document.querySelector('.nav__toggle');
var inputName = document.querySelector (".input__text[name='name']");
var inputWeight = document.querySelector (".input__text[name='weight']");
var inputAge = document.querySelector (".input__text[name='age']");
var inputTel = document.querySelector (".input__text[name='tel']");
var inputEmail = document.querySelector (".input__text[name='email']");
var btn = document.querySelector(".btn--sub");

if (btn) {
  btn.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!inputName.value) {
      inputName.classList.add("input__text--error");
      console.log("Нужно заполнить все поля");
    }
    else { delError(inputName)}

    if (!inputWeight.value) {
      inputWeight.classList.add("input__text--error");
      console.log("Нужно заполнить все поля");
    }

    else { delError(inputWeight)}

    if (!inputAge.value) {
      inputAge.classList.add("input__text--error");
      console.log("Нужно заполнить все поля");
    }

    else { delError(inputAge)}

    if (!inputTel.value) {
      inputTel.classList.add("input__text--error");
      console.log("Нужно заполнить все поля");
    }

    else { delError(inputTel)}

    if (!inputEmail.value) {
      inputEmail.classList.add("input__text--error");
      console.log("Нужно заполнить все поля");
    }

    else { delError(inputEmail)}
  });
}

function delError (input) {
  if ( input.classList.contains("input__text--error") )
  {
    input.classList.remove("input__text--error");
  }
}

navMain.classList.remove('nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('nav--closed')) {
    navMain.classList.remove('nav--closed');
    navMain.classList.add('nav--opened');
  } else {
    navMain.classList.add('nav--closed');
    navMain.classList.remove('nav--opened');
  }
});
