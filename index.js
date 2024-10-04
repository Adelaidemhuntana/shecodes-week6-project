document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("search-form");
  form.addEventListener("submit", search);
});

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = "Loading...";

  let apiKey = "d7bft2a2ecbd3c41d91cf26o4a04c0b3"; // Your API Key
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(displayTemperature)
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found! Please try again.");
    });
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let dateElement = document.querySelector("#current-date");

  let temperature = Math.round(response.data.current.temperature);
  let city = response.data.city;
  let date = new Date(response.data.time * 1000);

  // Format date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.innerHTML = date.toLocaleDateString(undefined, options);

  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = city;
}
