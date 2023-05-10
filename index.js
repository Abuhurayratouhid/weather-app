const apiKey = "95b23c9eef5a5e9ceced8d0c65f007fc"

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector('form')

formEl.addEventListener("submit",(e)=>{
    e.preventDefault()
    const cityInputValue = cityInputEl.value;
    console.log(cityInputValue)
    getWeatherData(cityInputValue)
})


async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Fells like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="sun-icon">`

        weatherDataEl.querySelector('.temp').textContent = `${temperature}°C`

        weatherDataEl.querySelector('.description').textContent = `${description}`


        weatherDataEl.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join('')

        console.log(data)

    }catch (error){

        weatherDataEl.querySelector(".icon").innerHTML = ""

        weatherDataEl.querySelector('.temp').textContent = ""

        weatherDataEl.querySelector('.description').textContent = `An Error happened, Please try again letter`


        // weatherDataEl.querySelector(".details").innerHTML = details.map(detail => `<div></div>`).join('')
        
        console.log(error)
    }
}