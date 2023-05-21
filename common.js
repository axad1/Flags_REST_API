// const URL = "http://localhost:3000";
const URL = "https://restcountries.com/v3.1";

document.getElementById("toggleTheme").onclick = function () {
  this.firstElementChild.classList.toggle("fa-solid");
  document.body.classList.contains("dark")
    ? (this.lastChild.textContent = " Dark Mode")
    : (this.lastChild.textContent = " Light Mode");
  document.body.classList.toggle("dark");
};

function createElement(name) {
  return document.createElement(name);
}

async function fetchData(endpoint) {
  const res = await fetch(`${URL}/${endpoint}`);
  return await res.json();
}
