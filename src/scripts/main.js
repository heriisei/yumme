import './components/nav';
import './components/restaurant-list';

const main = async () => {
  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function onreadystatechangeHandler() {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // load list of menu to navbar
        document.querySelectorAll('.nav-bar__list, .nav-drawer__list, .nav-footer__list').forEach((node) => {
          const element = node;
          element.innerHTML = xhttp.responseText;
        });
      }
    };
    xhttp.open('GET', './../pages/nav.html', true);
    xhttp.send();
  }

  loadNav();

  // get current url
  let currentUrl = window.location.hash.substr(1);
  if (currentUrl === '' || currentUrl === 'main-content') currentUrl = 'home';

  // function currentPage(page) {
  //   if (page === 'home') {}
  // }

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function onreadystatechangeHandler() {
      if (this.readyState === 4) {
        const content = document.querySelector('#main-content');
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
          // currentPage(page);
        } else if (this.status === 400) {
          content.innerHTML = "<p>We're sorry, the page is cannot be found.</p>";
        } else {
          content.innerHTML = "<p>Ups.. We're sorry, the page is cannot be accessed.</p>";
        }
      }
    };
    xhttp.open('GET', `pages/${page}.html`, true);
    xhttp.send();
  }

  loadPage(currentUrl);
};

export default main;
