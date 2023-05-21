const query = new URLSearchParams(location.search).get("country");

function renderDetails([country]) {
  const flag = document.getElementById("flag");
  const countryName = document.getElementById("country_name");
  const borderCountries = document.getElementById("borders");
  const infoSpan = document.querySelectorAll(".info span");

  const {
    flags: { alt, svg },
    name: { common: nativeName, official: officialName },
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders = [],
  } = country;

  const currency = Object.values(currencies)[0];

  const infoData = [
    nativeName,
    population.toLocaleString(),
    region,
    subregion,
    capital,
    tld.join(", "),
    `${currency.name} (${currency.symbol})`,
    Object.values(languages).join(", "),
  ];

  flag.src = svg;
  flag.alt = alt;
  countryName.textContent = officialName;
  infoSpan.forEach((span, idx) => {
    span.textContent = infoData[idx];
  });

  borders.forEach(async (border) => {
    const [
      {
        name: { common: name },
      },
    ] = await fetchData(`alpha/${border}`);
    const a = createElement("a");
    a.textContent = name;
    a.href = `details.html?country=${name}`;
    borderCountries.appendChild(a);
  });
}

const mainElement = document.querySelector("main");

fetchData(`name/${query}`)
  .then((data) => renderDetails(data))
  .catch((err) => console.log(err));
