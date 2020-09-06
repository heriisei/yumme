const main = async () => {

  console.log('main.js');
  const hamburgerMenuElem = document.querySelector('#btn-hamburger');
  const menuDrawerElem = document.querySelector('#nav-drawer');
  const mainElem = document.querySelector('main');

  hamburgerMenuElem.addEventListener('click', event => {
    menuDrawerElem.classList.toggle('is-open');
    event.stopPropagation();
    console.log('hamburger');
  });

  mainElem.addEventListener('click', event => {
    menuDrawerElem.classList.remove('is-open');
    event.stopPropagation();
    console.log('hamburger close');
  })
}

export default main;