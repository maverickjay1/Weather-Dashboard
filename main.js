import { handleLocationSearch } from "./userLocation.js";
import { fetchWeatherData } from "./fetchWeather.js";

const searchButtonRef = document.getElementById("searchButton");
const locationInputRef = document.getElementById("locationInput");
const weatherInfoRef = document.getElementById("weatherInfo");

searchButtonRef.addEventListener("click", async () => {
  try {
    const coords = await handleLocationSearch(locationInputRef);
    fetchWeatherData(coords.latitude, coords.longitude, weatherInfoRef);
  } catch (error) {
    console.error("Location search error: ", error);
  }
});

//Workflow 1:

//Function for user to type into searchbox their city/town:
//Done - in userLocation.js

//should come up with at least 10 options for them to choose from (drop down)

//Click event - fills the selection into the searchbox

//Function to get coords for inputted city/town from API

//Async op - once got coords - call 5 day weather forecast API for city/town

//Display on page - keep search box at top to enable additional searches

//Workflow 2:

//User press button to enable geolocation

//Once got coords - call 5 day weather forecast API for location

//Display on page - keep search box at top to enable additional searches
