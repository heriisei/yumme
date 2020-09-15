const hamburgerMenuElem = document.querySelector('#btn-hamburger');
const menuDrawerElem = document.querySelector('#nav-drawer');
const headerElem = document.querySelector('header');
const mainElem = document.querySelector('main');
const footerElem = document.querySelector('footer');

hamburgerMenuElem.addEventListener('click', event => {
  menuDrawerElem.classList.toggle('is-open');
  hamburgerMenuElem.classList.toggle('is-active');
  event.stopPropagation();
});

headerElem.addEventListener('click', event => {
  menuDrawerElem.classList.remove('is-open');
  hamburgerMenuElem.classList.remove('is-active');
  event.stopPropagation();
});

mainElem.addEventListener('click', event => {
  menuDrawerElem.classList.remove('is-open');
  hamburgerMenuElem.classList.remove('is-active');
  event.stopPropagation();
});

footerElem.addEventListener('click', event => {
  menuDrawerElem.classList.remove('is-open');
  hamburgerMenuElem.classList.remove('is-active');
  event.stopPropagation();
});