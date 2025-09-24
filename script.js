document.addEventListener("DOMContentLoaded", function () {
  //Tilt Weather Dashboard
  (function () {
    const scene = document.querySelector(".weather-app");
    window.addEventListener("mousemove", (e) => {
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      scene.style.transform = `perspective(900px) rotateY(${
        x * 2
      }deg) rotateX(${y * -1.2}deg)`;
    });
    window.addEventListener("mouseleave", () => (scene.style.transform = ""));
  })();

  const APIKey = "0783b4785d0fb3d7913e7bb878c54bff";
  const temperature = document.querySelectorAll(".temperature");
  let condition = document.querySelector(".condition");

  // Check if geolocation is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const weatherAPI = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`
        );
        const weatherResult = await weatherAPI.json();
        const data = Math.round(weatherResult.main.temp - 273.15);
        temperature.forEach((temp) => {
          temp.innerHTML = data + "&deg;";
        });
        switch (true) {
          case data >= 0 && data <= 10:
            condition.textContent = "Very Cold";
            break;

          case data >= 11 && data <= 16:
            condition.textContent = "Cloudy";
            break;

          case data >= 17 && data <= 22:
            condition.textContent = "Partly cloudy";
            break;

          case data >= 23 && data <= 28:
            condition.textContent = "Sunny Day";
            break;

          case data >= 29 && data <= 34:
            condition.textContent = "Mostly Sunny";
            break;

          case data >= 35:
            condition.textContent = "Heatwave";
            break;

          default:
            condition.textContent = "Unknown weather";
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  async function searchWeatherLocation(location) {
    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`
    );
    const apiResult = await apiCall.json();
    const data = Math.round(apiResult.main.temp - 273.15);
    temperature.forEach((temp) => {
      temp.innerHTML = data + "&deg;";
    });
    switch (true) {
      case data >= 0 && data <= 10:
        condition.textContent = "Very Cold";
        break;

      case data >= 11 && data <= 16:
        condition.textContent = "Cloudy";
        break;

      case data >= 17 && data <= 22:
        condition.textContent = "Partly cloudy";
        break;

      case data >= 23 && data <= 28:
        condition.textContent = "Sunny Day";
        break;

      case data >= 29 && data <= 34:
        condition.textContent = "Mostly Sunny";
        break;

      case data >= 35:
        condition.textContent = "Heatwave";
        break;

      default:
        condition.textContent = "Unknown weather";
    }
  }

  const locationInput = document.getElementById("location-input");
  locationInput.addEventListener("keydown", (e) => {
    e.key === "Enter" && searchWeatherLocation(e.target.value);
  });
});

AOS.init();
