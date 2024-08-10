const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

function renderCountries(data) {
  countryContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `country.html?name=${country.name.common}`;
    const cardHtml = ` 
        <img id="flag" src="${country.flags.svg}" alt="${
      country.name.common
    }-flag" />
        <div class="card-text">
          <h3 id="card-title" class="card-title">${country.name.common}</h3>
          <p id="population"><b>Population:</b> ${country.population.toLocaleString(
            "en-IN"
          )}</p>
          <p id="region"><b>Region:</b> ${country.region}</p>
          <p id="capital"><b>Capital:</b> ${country.capital?.[0]}</p>
        </div>`;
    countryCard.innerHTML = cardHtml;
    countryContainer.appendChild(countryCard);
  });
}

filterByRegion.addEventListener("change", (e) => {
  console.log(filterByRegion.value);
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountries(data);
    });
});

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });
  renderCountries(filteredCountries);
});
