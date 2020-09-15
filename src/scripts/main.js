import './components/nav.js';
import './components/restaurant-list.js';

const main = async () => {

  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status != 200) return;

        //load list of menu to navbar
        document.querySelectorAll(".nav-bar__list, .nav-drawer__list, .nav-footer__list").forEach(function(elm){
          elm.innerHTML = xhttp.responseText;
        });
      }
    };
    xhttp.open("GET", "./../pages/nav.html", true);
    xhttp.send();
  }

  //get current url
  let page = window.location.hash.substr(1);
  if (page === "" || page === "main-content") page = "home";
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        const content = document.querySelector("#main-content");
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
          currentPage(page);
        } else if (this.status === 400) {
          content.innerHTML = "<p>We're sorry, the page is cannot be found.</p>";
        } else {
          content.innerHTML = "<p>Ups.. We're sorry, the page is cannot be accessed.</p>";
        }
      }
    }
    xhttp.open("GET", "pages/"+page+".html", true);
    xhttp.send();
  }

  function currentPage(page) {
    if (page === "home") {
    }
  }
}

export default main;