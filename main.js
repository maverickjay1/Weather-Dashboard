import { handleLocationSearch } from "./userLocation.js";
import {
  fetchLocationSuggestions,
  displayLocationSuggestions,
} from "./userLocation.js";
import { fetchWeatherData } from "./fetchWeather.js";

export const searchButtonRef = document.getElementById("searchButton");
const locationInputRef = document.getElementById("locationInput");
const weatherInfoRef = document.getElementById("weatherInfo");
const locationDropdownRef = document.getElementById("locationDropdown"); // Add a reference for the dropdown

locationInputRef.addEventListener("input", async () => {
  try {
    // Fetch location suggestions based on the input value
    const suggestions = await fetchLocationSuggestions(locationInputRef.value);

    // Populate the dropdown with suggestions
    displayLocationSuggestions(
      suggestions,
      locationDropdownRef,
      locationInputRef
    );
  } catch (error) {
    console.error("Location suggestions error: ", error);
  }
});

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
