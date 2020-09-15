const jsonData = require('./../../DATA.json');
import './external-restaurant.js';

class RestaurantList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.filteredData();
  }

  filteredData() {
    const data = jsonData.restaurants;
    const filteredCity = removeDuplicates(data);
    function removeDuplicates(array) {
      let tempArray = [];
      array.map(item => {
        if(!tempArray.includes(item.city)) {
          tempArray.push(item.city);
        }
      })
      return tempArray.sort();
    }

    const restaurantListElem = document.querySelector('.restaurant-all__list');
    let listElems = [];
    filteredCity.forEach(city => {
      listElems.push(
        `
          <li class="restaurant-all__item">
            <section class="restaurant-by-city">
              <h3 tabindex="0" aria-label="List of Restaurant in ${city} City">
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.00004 0.333313C2.42004 0.333313 0.333374 2.41998 0.333374 4.99998C0.333374 7.77998 3.28004 11.6133 4.49337 13.0733C4.76004 13.3933 5.24671 13.3933 5.51337 13.0733C6.72004 11.6133 9.66671 7.77998 9.66671 4.99998C9.66671 2.41998 7.58004 0.333313 5.00004 0.333313ZM5.00004 6.66665C4.55801 6.66665 4.13409 6.49105 3.82153 6.17849C3.50897 5.86593 3.33337 5.44201 3.33337 4.99998C3.33337 4.55795 3.50897 4.13403 3.82153 3.82147C4.13409 3.50891 4.55801 3.33331 5.00004 3.33331C5.44207 3.33331 5.86599 3.50891 6.17855 3.82147C6.49111 4.13403 6.66671 4.55795 6.66671 4.99998C6.66671 5.44201 6.49111 5.86593 6.17855 6.17849C5.86599 6.49105 5.44207 6.66665 5.00004 6.66665V6.66665Z" fill="black"/>
                </svg>
                ${city}
              </h3>
              <div class="restaurant-by-city__list-wrapper">
                <ul class="restaurant-by-city__list">
                  ${(function populate() {
                    let elems = [];
                    data.forEach(restaurant => {
                      if (restaurant.city === city) {
                        elems.push(`
                          <li class="restaurant-by-city__item">
                            <article class="restaurant-card" tabindex="0">
                              <figure class="restaurant-card__header">
                                <img src="${restaurant.pictureId}" alt="${restaurant.name} Restaurant Photo" loading="lazy" height="336" width ="200" aria-hidden="true"/>
                                <figcaption aria-label="${restaurant.name} Restaurant">${restaurant.name}</figcaption>
                                <div class="restaurant-card__rating" aria-label="${restaurant.rating}-star Rating"><span class="rating-icon">★</span>${restaurant.rating}</div>
                              </figure>
                              <div class="restaurant-card__body">
                                <div class="restaurant-card__desc">${restaurant.description}</div>
                              </div>
                            </article>
                          </li>
                        `);
                      }
                    });
                    return elems.join('');
                  })()
                  }
                </ul>
              </div>
            </section>
          </li>
        `
      );
    });
    restaurantListElem.innerHTML += listElems.join('');
    restaurantListElem.prepend(document.createElement('external-restaurant'));
  }

  render() {
    this.innerHTML = `
      <h2 tabindex="0" aria-label="List of all Restaurant">Restaurant</h2>
      <ul class="restaurant-all__list">
      </ul>
    `
  }
}

customElements.define('restaurant-list', RestaurantList);