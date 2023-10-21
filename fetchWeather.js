import { handleLocationSearch } from "./userLocation.js";

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
    const currentTemperature = currentForecast.main.temp.toFixed(2);
    // weatherInfoRef.innerHTML = `<h2>Current Temperature:</h2>`;
    const cityOrTownName = locationInputRef.value; // Get the name from your input
    weatherInfoRef.innerHTML = `<h2>${cityOrTownName}</h2>`;
    weatherInfoRef.innerHTML += `<h3>Current Temperature: ${currentTemperature}°C</p>`;

    // // Extract and display the next 5 days' forecasts
    // const next5DaysForecasts = forecasts.slice(0, 5);

    // Extract and display the next 5 days' forecasts (approximately every 24 hours)
    const next5DaysForecasts = [];

    for (let i = 0; i < forecasts.length; i += 8) {
      if (next5DaysForecasts.length >= 5) {
        break; // Stop when you have 5 forecasts
      }
      next5DaysForecasts.push(forecasts[i]);
    }

    weatherInfoRef.innerHTML += "<h4>Next 5 Days:</h4>";

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

      // const options = { weekday: "long", day: "numeric", month: "long" };

      // Calculate temperature in Celsius
      const temperatureCelsius = forecast.main.temp.toFixed(2);

      // Display the forecast with date and temperature in Celsius
      //   weatherInfoRef.innerHTML += `<p>Day ${
      //     index + 1
      //   }: ${forecastTime.toLocalDateString(
      //     undefined,
      //     options
      //   )} - Temperature: ${temperatureCelsius}°C</p>`;
      // });

      weatherInfoRef.innerHTML += `<p>${customDate} - Temperature: ${temperatureCelsius}°C</p>`;
    });

    //   weatherInfoRef.innerHTML += `<p>${forecastTime.toLocaleDateString(
    //     undefined,
    //     options
    //   )} - Temperature: ${temperatureCelsius}°C</p>`;
    // });

    weatherInfoRef.style.textAlign = "center"; // Center-align the weather results
  } catch (error) {
    console.error(error);
  }
}

//     // Use map to extract the 9 am forecasts
//     const forecastsAt9am = forecasts.filter(
//       (forecast) => new Date(forecast.dt * 1000).getUTCHours() === 9
//     );

//     // Extract and display the next 5 days at 9 am
//     const next5DaysForecasts = forecastsAt9am.slice(0, 5);
//     weatherInfoRef.innerHTML = "<h2>Next 5 Days at 9 am:</h2>";

//     next5DaysForecasts.forEach((forecast, index) => {
//       const forecastTime = new Date(forecast.dt * 1000);

//       // Calculate temperature in Celsius
//       const temperatureCelsius = forecast.main.temp.toFixed(2);

//       // Display the forecast with date and temperature in Celsius
//       weatherInfoRef.innerHTML += `<p>Day ${
//         index + 1
//       }: ${forecastTime.toDateString()}, 9 am - Temperature: ${temperatureCelsius}°C</p>`;
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
