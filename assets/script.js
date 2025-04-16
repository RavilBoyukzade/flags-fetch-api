let allCountries = [];
    let filteredCountries = [];
    let currentPage = 1;
    const countriesPerPage = 12;

    document.getElementById('loadBtn').addEventListener('click', fetchCountries);
    document.getElementById('regionSelect').addEventListener('change', filterByRegion);

    function fetchCountries() {
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
          allCountries = data;
          filteredCountries = data;
          currentPage = 1;
          displayCountries();
          updatePagination();
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
    }

    function filterByRegion() {
      const region = document.getElementById('regionSelect').value;
      filteredCountries = region === 'all' ? allCountries : allCountries.filter(c => c.region === region);
      currentPage = 1;
      displayCountries();
      updatePagination();
    }

    function displayCountries() {
      const countryList = document.getElementById('countryList');
      countryList.innerHTML = '';

      const start = (currentPage - 1) * countriesPerPage;
      const end = start + countriesPerPage;
      const countriesToShow = filteredCountries.slice(start, end);

      countriesToShow.forEach(country => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}" />
            <div class="card-body">
              <h5 class="card-title">${country.name.common}</h5>
              <p class="card-text">
                <strong>Столица:</strong> ${country.capital ? country.capital[0] : 'Нет данных'}<br />
                <strong>Регион:</strong> ${country.region}<br />
                <strong>Население:</strong> ${country.population.toLocaleString()}
              </p>
            </div>
          </div>
        `;
        countryList.appendChild(card);
      });
    }

    function updatePagination() {
      const pagination = document.getElementById('pagination');
      pagination.innerHTML = '';

      const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<button class="page-link">${i}</button>`;
        li.addEventListener('click', () => {
          currentPage = i;
          displayCountries();
          updatePagination();
        });
        pagination.appendChild(li);
      }
    }