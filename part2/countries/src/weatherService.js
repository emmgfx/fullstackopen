import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const get = (latitude, longitude) => {
  const request = axios.get(`${baseUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`)
  return request.then(response => response.data)
}

export default { 
  get: get,
}