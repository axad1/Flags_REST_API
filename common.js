// const URL = "http://localhost:3000";
const URL = "https://restcountries.com/v3.1";

const theme = localStorage.getItem("THEME");
if (theme === "dark") document.body.classList.add(theme);

document.getElementById("toggleTheme").onclick = function () {
  this.firstElementChild.classList.toggle("fa-solid");
  const theme = document.body.classList.contains("dark") ? null : "dark";
  theme
    ? (this.lastChild.textContent = " Dark Mode")
    : (this.lastChild.textContent = " Light Mode");
  document.body.classList.toggle("dark");
  localStorage.setItem("THEME", theme);
};

function createElement(name) {
  return document.createElement(name);
}

async function fetchData(endpoint) {
  const res = await fetch(`${URL}/${endpoint}`);
  return await res.json();
}
