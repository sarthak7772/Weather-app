const apiKey = "1baee544f958c59dcaa890bac9889a36";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const weatherIcon = document.querySelector(".weather-icon"); 
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {

        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
    
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
