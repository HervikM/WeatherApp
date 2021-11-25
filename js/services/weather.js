import { BASE_API, API_KEY, } from '../constants.js'

export async function getCurrentWeather(lat, lon){
   const response = await fetch(`${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  if(!response.ok)return{
     isError:true,
     data:null
  }
  const data = await response.json()
  return{
     isError: false,
     data,
  }
}


// -33.4610527 LAT
// -70.7519841 LON