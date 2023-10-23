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

//this code replaces the search button below. if i reactivate search, deactivate this.
locationInputRef.addEventListener("change", async () => {
  try {
    const coords = await handleLocationSearch(locationInputRef);
    fetchWeatherData(
      coords.latitude,
      coords.longitude,
      weatherInfoRef,
      locationInputRef
    );
  } catch (error) {
    console.error("Location search error: ", error);
  }
});

//search button - can re-add if you see fit
// searchButtonRef.addEventListener("click", async () => {
//   try {
//     const coords = await handleLocationSearch(locationInputRef);
//     fetchWeatherData(coords.latitude, coords.longitude, weatherInfoRef);
//   } catch (error) {
//     console.error("Location search error: ", error);
//   }
// });
