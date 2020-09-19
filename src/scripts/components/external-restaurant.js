const axios = require('axios');

class ExternalRestaurant extends HTMLElement {
  connectedCallback() {
    this.render();
    this.constructor.apiCall();
  }

  static async apiCall() {
    const api = axios.create({
      baseURL: 'https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=10&category=9&sort=rating&order=desc',
      headers: { 'user-key': '854bcb1aac0878e90a5752af952fe861' },
    });

    try {
      const response = await api.get();
      const responseData = response.data.restaurants;

      const restaurantExtElem = document.querySelector('.restaurant-by-city__list.restaurant-external');
      const listElems = [];
      responseData.forEach((restaurant) => {
        const resPhone = restaurant.restaurant.phone_numbers.split(', ');
        listElems.push(
          `
            <li class="restaurant-by-city__item">
              <article class="restaurant-card" tabindex="0">
                <figure class="restaurant-card__header">
                  <img src="${restaurant.restaurant.thumb}?fit=around%7C300%3A200&crop=300%3A200%3B%2A%2C%2A" alt="${restaurant.restaurant.name} Restaurant Photo" loading="lazy" height="336" width ="200" aria-hidden="true"/>
                  <figcaption aria-label="${restaurant.restaurant.name} Restaurant">
                    ${restaurant.restaurant.name}
                  </figcaption>
                  <div class="restaurant-card__rating" aria-label="${restaurant.restaurant.user_rating.aggregate_rating}-star Rating">
                    <span class="rating-icon">★</span>
                    ${restaurant.restaurant.user_rating.aggregate_rating}
                  </div>
                </figure>
                <div class="restaurant-card__body">
                  <div class="restaurant-card__desc">
                    <div class="restaurant-card__cost">
                      Rp${restaurant.restaurant.average_cost_for_two.toLocaleString().replace(/,/g, '.')} <span class="text-gray">for two people (approx.)</span>
                    </div>
                    <div class="restaurant-card__phone">
                      ${
                        (function phoneNumbers() {
                          const elems = [];
                          resPhone.forEach((phone) => {
                            elems.push(`<a href="tel:${phone}">(${phone})</a> `);
                          });
                          return elems.join('');
                        }())
                      }
                    </div>
                    <div class="restaurant-card__location">
                      ${restaurant.restaurant.location.address}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          `,
        );
      });
      restaurantExtElem.innerHTML += listElems.join('');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this.innerHTML = `
      <li class="restaurant-all__item">
        <section class="restaurant-by-city">
          <h3 tabindex="0" aria-label="List of Restaurant in Jakarta City">
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.00004 0.333313C2.42004 0.333313 0.333374 2.41998 0.333374 4.99998C0.333374 7.77998 3.28004 11.6133 4.49337 13.0733C4.76004 13.3933 5.24671 13.3933 5.51337 13.0733C6.72004 11.6133 9.66671 7.77998 9.66671 4.99998C9.66671 2.41998 7.58004 0.333313 5.00004 0.333313ZM5.00004 6.66665C4.55801 6.66665 4.13409 6.49105 3.82153 6.17849C3.50897 5.86593 3.33337 5.44201 3.33337 4.99998C3.33337 4.55795 3.50897 4.13403 3.82153 3.82147C4.13409 3.50891 4.55801 3.33331 5.00004 3.33331C5.44207 3.33331 5.86599 3.50891 6.17855 3.82147C6.49111 4.13403 6.66671 4.55795 6.66671 4.99998C6.66671 5.44201 6.49111 5.86593 6.17855 6.17849C5.86599 6.49105 5.44207 6.66665 5.00004 6.66665V6.66665Z" fill="black"/>
            </svg>
            Jakarta
          </h3>
          <div class="restaurant-by-city__list-wrapper">
            <ul class="restaurant-by-city__list restaurant-external">

            </ul>
          </div>
        </section>
      </li>
    `;
  }
}

customElements.define('external-restaurant', ExternalRestaurant);
