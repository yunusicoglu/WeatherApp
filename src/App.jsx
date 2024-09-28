import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'

function App() {
const [cityInput, setCityInput] = useState('')
const [weatherData, setWeatherData] = useState(null)
const [formattedWeatherData, setFormattedWeatherData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${cityInput}&days=9&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
        console.log(response.data);
        console.log(import.meta.env.VITE_WEATHER_API);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [cityInput])

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
        <div className='top-section'>
          <div className='city-name'>{formattedWeatherData?.location.region}</div>
          <div className='div-input-today'>
            <div className='div-input'>
              <input 
                className='cityInput' 
                type="text"
                value={cityInput} 
                onChange={handleInputChange}
                placeholder='Bir şehir giriniz...'
              />
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
          </div>
        <div className='div-other-days'>
          { formattedWeatherData
            ? (
              formattedWeatherData.forecast.forecastday.map((day,i) => (
                i === 0 
                ? null 
                : (
                  <div className='other-days' key={day.date}>
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
                )
              )) 
            )
            : (
              <div style={{display:"flex", width:"100%", justifyContent:"space-evenly"}}>
                <div className='other-days'></div>
                <div className='other-days'></div>
                <div className='other-days'></div>
                <div className='other-days'></div>
                <div className='other-days'></div>
                <div className='other-days'></div>
                <div className='other-days'></div>
                <div className='other-days'></div>
              </div>
            )
          }

        </div>
      </div>
    </>
  )
}

export default App
