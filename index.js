let countries = [];

document.querySelector('input[name="search"]').oninput = function (e) {
  const searchResult = countries.filter((country) =>
    country.name.official.toLowerCase().includes(this.value.toLowerCase())
  );
  renderCards(searchResult);
};

document.querySelector("select").oninput = function (e) {
  if (!this.value) {
    renderCards(countries);
    return;
  }
  const filterResult = countries.filter(
    (country) => country.region == this.value
  );
  renderCards(filterResult);
};

function renderCards(countries) {
  const mainElement = document.querySelector("main");
  const container = createElement("div");
  container.classList.add("container");
  countries.forEach((country) => {
    const {
      name: { official: countryName },
      population,
      region,
      capital,
    } = country;
    const a = createElement("a");
    a.href = `details.html?country=${country.name.common}`;
    a.classList.add("card");

    const img = createElement("img");
    img.src = country.flags.png;
    img.alt = countryName;

    const div_textSection = createElement("div");
    div_textSection.classList.add("textSection");

    const h3_countryName = createElement("h3");
    h3_countryName.textContent = countryName;

    const h4_population = createElement("h4");
    h4_population.textContent = "Population: ";
    const span_population = createElement("span");
    span_population.textContent = population.toLocaleString();
    h4_population.appendChild(span_population);

    const h4_region = createElement("h4");
    h4_region.textContent = "Region: ";
    const span_region = createElement("span");
    span_region.textContent = region;
    h4_region.appendChild(span_region);

    const h4_capital = createElement("h4");
    h4_capital.textContent = "Capital: ";
    const span_capital = createElement("span");
    span_capital.textContent = capital ?? "None";
    h4_capital.appendChild(span_capital);

    div_textSection.appendChild(h3_countryName);
    div_textSection.appendChild(h4_population);
    div_textSection.appendChild(h4_region);
    div_textSection.appendChild(h4_capital);

    a.appendChild(img);
    a.appendChild(div_textSection);
    container.appendChild(a);
  });
  mainElement.replaceChildren(container);
}

fetchData("all").then((data) => {
  countries = data;
  renderCards(data);
});
