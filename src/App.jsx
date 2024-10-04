import { useEffect, useRef } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { CiSearch } from 'react-icons/ci'

function App() {
const [cityInput, setCityInput] = useState('')
const [city, setCity] = useState('istanbul')
const [weatherData, setWeatherData] = useState(null)
const [formattedWeatherData, setFormattedWeatherData] = useState(null)

  useEffect(() => {
    setCity(cityInput)
  }, [cityInput])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=630b0db8e95e45998a7172611242409&q=${city}&days=9&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
        console.log('response.data: ',response.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [city])
  

  useEffect(() => { //veride değişiklikler yapar
    const formattedDay = weatherData?.forecast.forecastday.map((day,i)=>{
      //tarih formatını değiştirir
      const date = new Date(day.date)
      const formattedDate = date.toLocaleDateString('en-GB')

      //gün ismini ekler
      const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
      const dayName = days[date.getDay()]

      return {
        ...day,
        date:formattedDate,
        dayname:dayName,
      }
    })

    if (weatherData) {
      setFormattedWeatherData({
        ...weatherData,
        forecast: {
          ...weatherData.forecast,
          forecastday: formattedDay
        }
      })
    }
    
  }, [weatherData])
  
  
  const handleInputChange = (e) => {
    setCityInput(e.target.value)
  }

  return (
    <>
      <div className='main'>
        <div className=''>
        </div>
        <div className='top-section'>
          <div className='city-name' key={formattedWeatherData?.location.region}>{formattedWeatherData?.location.region}</div>
          <div className='div-input'>
            <input 
              className='city-input' 
              type="text"
              value={cityInput} 
              onChange={handleInputChange}
              placeholder='Bir şehir giriniz...'
            />
            <div className='div-icon'><CiSearch style={{color:"white", fontSize:"30px", marginRight:"10px"}}/></div>
          </div>
          <div className='today-card'>
            {formattedWeatherData && (
              <div>
                <div style={{display:"flex", justifyContent:"center", fontSize:"22px"}}>
                  {formattedWeatherData?.forecast.forecastday[0].dayname}
                </div>
                <div style={{display:"flex", justifyContent:"center", fontSize:"13px", marginTop:"5px"}}>
                  ({formattedWeatherData?.forecast.forecastday[0].date})
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <img 
                    src={formattedWeatherData?.forecast.forecastday[0].day.condition.icon} 
                    alt={formattedWeatherData?.forecast.forecastday[0].day.condition.text} 
                  />
                </div>
                <div style={{display:"flex", justifyContent:"center", fontSize:"20px"}}>
                  {Math.floor(formattedWeatherData?.forecast.forecastday[0].day.avgtemp_c)}°
                </div>
              </div>
            )}
          </div>
        </div>
          { formattedWeatherData &&
            (
              <div className='div-all-other-days'>

                {formattedWeatherData.forecast.forecastday.map((day,i) => (
                  i === 0 
                  ? null 
                  : (
                      <div className='div-other-days' key={day.date}>
                        <div className='other-days'>
                          <div style={{display:"flex", justifyContent:"center", fontSize:"22px"}}>
                            {day.dayname}
                          </div>
                          <div style={{display:"flex", justifyContent:"center", fontSize:"13px", marginTop:"5px"}}>
                            ({day.date})
                          </div>
                          <div style={{display:"flex", justifyContent:"center"}}>
                            <img 
                              src={day.day.condition.icon} 
                              alt={day.day.condition.text} 
                            />
                          </div>
                          <div style={{display:"flex", justifyContent:"center", fontSize:"20px"}}>
                            {Math.floor(day.day.avgtemp_c)}°
                          </div>
                        </div>
                      </div>
                  )
                ))} 
              </div>
            )
          }
      </div>
    </>
  )
}

export default App
