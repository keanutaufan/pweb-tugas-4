async function getWeatherData() {
  const query = document.getElementById("search").value;

  document.getElementById("info").style.display = "none";
  document.getElementById("notfound").style.display = "block";
  document.getElementById("notfound").innerText = `Loading data for '${query.replace(/^./, query[0].toUpperCase())}'...`;

  const res = await fetch(`https://goweather.herokuapp.com/weather/${query}`);
  const data = await res.json();

  if (res.status == 404) {
    document.getElementById("info").style.display = "none";
    document.getElementById("notfound").style.display = "block";
    document.getElementById("notfound").innerText = `City '${query.replace(/^./, query[0].toUpperCase())}' not found`;
    return;
  }

  console.log(data);
  document.getElementById("info").style.display = "flex";
  document.getElementById("notfound").style.display = "none";

  document.getElementById("city-name").innerText = `Weather of ${query.replace(/^./, query[0].toUpperCase())}`;
  document.getElementById("temperature").innerText = data.temperature;
  document.getElementById("wind").innerText = data.wind;
}

window.onload = function() {
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    getWeatherData();
  });
}