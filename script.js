const apiKey = "af9fb7d7a9cec092b65786e9abd937c1"; // <-- Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function getWeather(lat, lon) {
  fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching weather data: ", error);
      alert("Unable to fetch weather data.");
    });
}

function displayWeather(data) {
  const city = data.name;
  const country = data.sys.country;
  const temp = data.main.temp;
  const weather = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  document.getElementById("city").textContent = city;
  document.getElementById("country").textContent = country;
  document.getElementById("temp").textContent = temp.toFixed(1);
  document.getElementById("weather").textContent = weather.charAt(0).toUpperCase() + weather.slice(1);
  document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
  document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} km/h`;
}

function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon);
    }, error => {
      console.error("Geolocation error: ", error);
      alert("Location access is needed for weather data.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

window.onload = getGeolocation;
