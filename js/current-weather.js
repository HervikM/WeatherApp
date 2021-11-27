// import weather from '../data/current-weather.js'
import {formatDate, formatTemp} from './utils/format-data.js'
import { weatherConditionCodes} from './constants.js'
import { getLatLon } from './geolocation.js'
import { getCurrentWeather} from './services/weather.js'



// City Function
function setCurrentCity($el, city){
   $el.textContent = city
}

// Date Function
function setCurrentDate($el){
   const date = new Date()
   const formattedDate = formatDate(date)
   $el.textContent = formattedDate
}

// Temp Function
function setCurrentTemp($el, temp){
   $el.textContent = formatTemp(temp)

}

// Backgrounds Function
function solarStatus(currentTime,sunsetTime, sunriseTime){
   const currentHours = currentTime.getHours() //Hora actual
   const sunsetHours = sunsetTime.getHours()  //Amanece
   const sunriseHours = sunriseTime.getHours()  //Anochece
   console.log(currentHours)
   console.log(sunsetHours)
   console.log(sunriseHours)

   if(currentHours > sunriseHours || currentHours < sunsetHours){
      return 'night'
   }
   return 'morning'

}

function setBackground($el, conditionCode, solarStatus){
   const weatherType= weatherConditionCodes[conditionCode]
   const size = window.matchMedia(' (-webkit-min-device-pixel-ratio: 2) ').matches ? '@2x' : ''


   $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

// LOADER
function showCurretnWeather($app, $loader){
   $app.hidden = false
   $loader.hidden = true
}

//Funcion para la configuracion actual del clima
function configCurrentWeather(weather){
   const $app = document.querySelector('#app')
   const $loading = document.querySelector('#loading')

   // Loader
   showCurretnWeather($app, $loading )


   // City
   const $currentWeatherCity = document.querySelector('#current-weather-city')
   const city = weather.name
   setCurrentCity($currentWeatherCity, city)

   // Date
   const $currentWeatherDate = document.querySelector('#current-weather-date')
   setCurrentDate($currentWeatherDate)

   // Temp
   const $currentWeatherTemp = document.querySelector('#current-weather-temp')
   const temp = weather.main.temp
   setCurrentTemp($currentWeatherTemp, temp)

   // Back
   const currentTime = new Date()
   const sunriseTime = new Date( weather.sys.sunrise * 1000)
   const sunsetTime = new Date(weather.sys.sunset * 1000)
   const conditionCode = String(weather.weather[0].id).charAt(0)
   setBackground($app, conditionCode, solarStatus(currentTime,sunriseTime, sunsetTime))

}

export default async function currentWeather(){
   // GEO // API - weather // Config

   const {lat, lon, isError} = await getLatLon()
   if(isError) return console.log("ERROR", isError)



   const { isError:currentWeatherError, data: weather} = await getCurrentWeather( lat, lon)
   if(currentWeatherError) return console.log("Error al traer los datos del clima")
   configCurrentWeather(weather)

}