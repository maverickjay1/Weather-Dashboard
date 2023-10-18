export async function handleLocationSearch(locationInputRef) {
  return new Promise(async (resolve, reject) => {
    // event listener for search button / location input
    // searchButtonRef.addEventListener("click", async () => {
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
