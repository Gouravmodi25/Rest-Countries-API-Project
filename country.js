const countryName = new URLSearchParams(window.location.search).get("name");
const countryImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const tld = document.querySelector(".tld");
const currency = document.querySelector(".currency");
const languages = document.querySelector(".language");
const borderCountries = document.querySelector(".border-countries");
const themeSwitcher = document.querySelector(".theme-switcher");
const span = document.querySelector(".theme-switcher span");
const theme = localStorage.getItem("theme");
if (theme != null) {
  document.body.classList.toggle("dark");
}
if (document.body.className == "dark") {
  themeSwitcher.innerHTML = `
  <i class="fa-solid fa-sun"></i>&nbsp;&nbsp;<span>Light</span> Mode
  `;
} else {
  themeSwitcher.innerHTML = `
  <i class="fa-regular fa-moon"></i>&nbsp;&nbsp;<span>Dark</span> Mode
  `;
}

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((country) => {
      countryImage.src = country.flags.svg;
      countryNameH1.innerText = country.name.common;
      if (country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
      } else {
        nativeName.innerText = country.name.common;
      }
      population.innerText = country.population.toLocaleString("en-IN");
      region.innerText = country.region;
      if (country.subregion) {
        subRegion.innerText = country.subregion;
      }
      capital.innerText = country.capital?.[0];
      tld.innerText = country.tld.join(", ");
      if (country.currencies) {
        currency.innerText = Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", ");
      }
      if (country.languages) {
        languages.innerText = Object.values(country.languages).join(", ");
      }
      if (country.borders) {
        country.borders.forEach((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((response) => response.json())
            .then(([data]) => {
              const borderCountryTag = document.createElement("a");
              borderCountryTag.innerText = data.name.common;
              borderCountryTag.href = `country.html?name=${data.name.common}`;
              borderCountries.append(borderCountryTag);
            });
        });
      }
    });
  });

themeSwitcher.addEventListener("click", () => {
  const theme = localStorage.getItem("theme");
  if (theme != null) {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", "dark");
  }
  console.log(document.body.className);
  if (document.body.className == "dark") {
    themeSwitcher.innerHTML = `
    <i class="fa-solid fa-sun"></i>&nbsp;&nbsp;<span>Light</span> Mode
    `;
  } else {
    themeSwitcher.innerHTML = `
    <i class="fa-regular fa-moon"></i>&nbsp;&nbsp;<span>Dark</span> Mode
    `;
  }
  document.body.classList.toggle("dark");
});
