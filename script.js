let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let a;

function createCountryContainer(jsonData) {
  let card = document.createElement("div");
  card.setAttribute(
    "class",
    "country-card  d-flex flex-row col-12 col-md-5 ml-md-5"
  );
  resultCountries.appendChild(card);

  let cont1 = document.createElement("div");
  card.appendChild(cont1);

  let image = document.createElement("img");
  image.src = jsonData.flag;
  image.classList.add("country-flag");
  cont1.appendChild(image);

  let cont2 = document.createElement("div");
  card.appendChild(cont2);

  let countryName = document.createElement("h1");
  countryName.textContent = jsonData.name;
  countryName.classList.add("country-name");
  cont2.appendChild(countryName);

  let population = document.createElement("p");
  population.textContent = jsonData.population;
  population.classList.add("country-population");
  cont2.appendChild(population);
}

let options = {
  method: "GET",
};

fetch("https://apis.ccbp.in/countries-data", options)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    a = jsonData;
    for (let eachCountry of jsonData) createCountryContainer(eachCountry);
  });

function searchRequiredCountry(event) {
  resultCountries.textContent = "";
  for (let eachCountry of a) {
    let x = eachCountry.name;
    let countryName = x.toLowerCase();

    let y = searchInput.value;
    let inputtext = y.toLowerCase();

    if (countryName.includes(inputtext)) {
      createCountryContainer(eachCountry);
      console.log(eachCountry);
    }
  }

  if (searchInput.value === "") {
    for (let eachCountry of a) {
      createCountryContainer(eachCountry);
    }
  }
}
searchInput.addEventListener("keydown", searchRequiredCountry);
