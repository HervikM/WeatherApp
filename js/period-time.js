import { createDOM } from './utils/dom.js'
import { formatTemp, formatDate } from './utils/format-data.js'

export function periodTimeTemplate({temp, date, icon, description, index}){
   return `
      <li class="dayWeather-item" data-id="${index}">
          <span class="dayWeather-time">${date}</span>
          <img class="dayWeather-icon" width="48" height="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
          <span class="dayWeather-temp">${temp}</span>
      </li>
   `
}

export function createPeriodTime(weather, index){
   // debugger
   // temp
   // icon
   // date
   // description
   const dateOptions = {
      hour:'numeric',
      hour12:true

   }
   const temp = formatTemp(weather.main.temp)
   const date = formatDate(new Date(weather.dt * 1000),dateOptions)

   const config ={
      temp,
      date,
      icon:weather.weather[0].icon,
      description: weather.weather[0].description,
      index,
   }
   // debugger
   return createDOM(periodTimeTemplate(config))
}