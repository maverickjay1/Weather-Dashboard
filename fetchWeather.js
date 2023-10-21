import { handleLocationSearch } from "./userLocation.js";

function capitalizeFirstLetterOfWords(text) {
  return text.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

export async function fetchWeatherData(
  lat,
  lon,
  weatherInfoRef,
  locationInputRef
) {
  try {
    const appIdWeather = "6d23221c30258425ad91669a8ef415d4"; // OpenWeatherMap API key

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appIdWeather}&units=metric`;

    const response = await axios.get(apiUrl);

    console.log(response.data);

    const forecasts = response.data.list;

    // Extract the current forecast (first element in the list)
    const currentForecast = forecasts[0];

    // Display the current temperature
    const currentTemperature = Math.round(currentForecast.main.temp);
    const currentTemperatureMin = Math.round(currentForecast.main.temp_min);
    const currentTemperatureMax = Math.round(currentForecast.main.temp_max);
    const currentWeatherDescription = currentForecast.weather[0].description;
    const currentWeatherIconCode = currentForecast.weather[0].icon;
    const currentWeatherIconUrl = `https://openweathermap.org/img/wn/${currentWeatherIconCode}@2x.png`;
    const currentIconImage = document.createElement("img");
    currentIconImage.src = currentWeatherIconUrl;

    const capitalizedWeatherDescription = capitalizeFirstLetterOfWords(
      currentWeatherDescription
    );

    // weatherInfoRef.innerHTML = `<h2>Current Temperature:</h2>`;
    // const cityOrTownName = locationInputRef.value; // Get the name from your input
    const cityOrTownName = locationInputRef.value.split(",")[0].trim(); // Extract the city or town name
    const capitalizedCityOrTownName =
      cityOrTownName.charAt(0).toUpperCase() + cityOrTownName.slice(1); // Capitalize the first letter
    weatherInfoRef.innerHTML = `<h2>${capitalizedCityOrTownName}</h2>`;
    weatherInfoRef.innerHTML += `<h3>${currentTemperature}°C</h3>`;
    weatherInfoRef.appendChild(currentIconImage); // Append the weather icon image
    weatherInfoRef.innerHTML += `<h4>${capitalizedWeatherDescription}</h4>`; // Capitalized weather description
    weatherInfoRef.innerHTML += `<h4>Low: ${currentTemperatureMin}°C</h4>`;
    weatherInfoRef.innerHTML += `<h4>High: ${currentTemperatureMax}°C</h4>`;

    // Extract and display the next 5 days' forecasts (approximately every 24 hours)
    const next5DaysForecasts = [];

    let nextDay = new Date(); // Initialize with the current date
    let count = 0;

    for (let i = 0; i < forecasts.length; i++) {
      const forecastTime = new Date(forecasts[i].dt * 1000);

      // Check if the forecast is for the next day
      if (forecastTime.getDate() !== nextDay.getDate()) {
        next5DaysForecasts.push(forecasts[i]);
        nextDay.setDate(nextDay.getDate() + 1); // Move to the next day
        count++;
      }

      if (count >= 5) {
        break; // Stop when you have 5 forecasts
      }
    }

    weatherInfoRef.innerHTML += "<h3>Next 5 Days:</h3>";

    next5DaysForecasts.forEach((forecast, index) => {
      const forecastTime = new Date(forecast.dt * 1000);

      const weekday = forecastTime.toLocaleDateString(undefined, {
        weekday: "long",
      });
      const day = forecastTime.getDate();
      const month = forecastTime.toLocaleDateString(undefined, {
        month: "long",
      });

      const customDate = `${weekday} ${day} ${month}`;

      // Calculate temperature in Celsius
      const temperatureCelsius = Math.round(forecast.main.temp);

      const temperatureMin = Math.round(forecast.main.temp_min);
      const temperatureMax = Math.round(forecast.main.temp_max);
      const weatherDescription = capitalizeFirstLetterOfWords(
        forecast.weather[0].description
      );
      const weatherIconCode = forecast.weather[0].icon;
      const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

      weatherInfoRef.innerHTML += `<p>${customDate} - Temperature: ${temperatureCelsius}°C</p>`;
      weatherInfoRef.innerHTML += `<p>Low: ${temperatureMin}°C</p>`;
      weatherInfoRef.innerHTML += `<p>High: ${temperatureMax}°C</p>`;
      weatherInfoRef.innerHTML += `<p>${weatherDescription}</p>`;
      weatherInfoRef.innerHTML += `<img src="${weatherIconUrl}" alt="Weather Icon" />`;
    });

    weatherInfoRef.style.textAlign = "center"; // Center-align the weather results
  } catch (error) {
    console.error(error);
  }
}
