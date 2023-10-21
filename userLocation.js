import { searchButtonRef } from "./main.js";

export async function handleLocationSearch(locationInputRef) {
  return new Promise(async (resolve, reject) => {
    const location = locationInputRef.value;

    const appIdGeo = "37b29f091f8754cf8600dea56dee3863"; // OpenWeatherMap API key

    //geocoding - get coords for inputted location
    try {
      const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=10&appid=${appIdGeo}`;
      const geocodingResponse = await axios.get(geocodingUrl);

      console.log(geocodingResponse);

      if (geocodingResponse.data && geocodingResponse.data.length > 0) {
        const lat = geocodingResponse.data[0].lat;
        const lon = geocodingResponse.data[0].lon;

        resolve({ latitude: lat, longitude: lon });
      } else {
        reject("Location not found.");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function fetchLocationSuggestions(query) {
  const appIdGeo = "37b29f091f8754cf8600dea56dee3863";
  const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${appIdGeo}`;
  const response = await axios.get(geocodingUrl);
  return response.data;
}

export function displayLocationSuggestions(
  suggestions,
  locationDropdownRef,
  locationInputRef
) {
  if (suggestions.length) {
    const choicesHTML = suggestions.map((item, index) => {
      const { name = "", state = "", country = "" } = item;
      let fullLocation = `${name}, `;
      if (state && state.trim() !== "") {
        fullLocation += `${state}, `;
      }
      fullLocation += country;
      return `<p id="${index}" >${fullLocation}</p>`;
    });

    locationDropdownRef.innerHTML = choicesHTML.join("");

    // Add click event listeners to the suggestions
    const suggestionItems = locationDropdownRef.querySelectorAll("p");
    suggestionItems.forEach((item) => {
      item.addEventListener("click", () => {
        locationInputRef.value = item.textContent.trim();
        locationDropdownRef.innerHTML = ""; // Clear the dropdown
        // Automatically trigger the search
        searchButtonRef.click();
      });
    });
  } else {
    locationDropdownRef.innerHTML = ""; // Clear dropdown if no suggestions
  }
}
