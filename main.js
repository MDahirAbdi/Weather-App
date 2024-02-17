// Define the API key and API URL for fetching weather data
const apiKey = "4adaaf5144edbb21879bc8d8cd067091";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select necessary DOM elements
const searchBox = document.querySelector(" .search input");
const searchBtn = document.querySelector(" .search button");
const weatherIcon = document.querySelector(".weather-icon");

// Async function to fetch and display weather data
async function checkWeather(city) {
  // Fetch weather data from the API based on the provided city
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // Check if the response status is 404 (City not found)
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // If city found, parse the response data
    var data = await response.json();

    // Display weather information in the UI
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    // Set weather icon based on weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/Clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/Clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/Rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/Drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/Mist.png";
    }

    // Display weather information and hide error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Event listener for the search button click event
searchBtn.addEventListener("click", () => {
  // Call the checkWeather function with the value entered in the search box
  checkWeather(searchBox.value);
});

// Initial weather check for a default city (which might be undefined)
checkWeather(city);
