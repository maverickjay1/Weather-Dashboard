import { handleLocationSearch } from "./userLocation.js";

export async function fetchWeatherData(lat, lon, weatherInfoRef) {
  try {
    const appIdWeather = "6d23221c30258425ad91669a8ef415d4"; // OpenWeatherMap API key

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appIdWeather}`;

    const response = await axios.get(apiUrl);

    console.log(response.data);

    const forecasts = response.data.list;

    // Use map to extract the 9 am forecasts
    const forecastsAt9am = forecasts.filter(
      (forecast) => new Date(forecast.dt * 1000).getUTCHours() === 9
    );

    // Extract and display the next 5 days at 9 am
    const next5DaysForecasts = forecastsAt9am.slice(0, 5);
    weatherInfoRef.innerHTML = "<h2>Next 5 Days at 9 am:</h2>";

    next5DaysForecasts.forEach((forecast, index) => {
      const forecastTime = new Date(forecast.dt * 1000);

      // Calculate temperature in Celsius
      const temperatureCelsius = (forecast.main.temp - 273.15).toFixed(2);

      // Display the forecast with date and temperature in Celsius
      weatherInfoRef.innerHTML += `<p>Day ${
        index + 1
      }: ${forecastTime.toDateString()}, 9 am - Temperature: ${temperatureCelsius}°C</p>`;
    });
  } catch (error) {
    console.error(error);
  }
}
