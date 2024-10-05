import { useEffect, useRef } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { CiSearch } from 'react-icons/ci'
import { motion } from 'framer-motion'
import Arrow from './Arrow'
import TopSection from './TopSection'
import OtherDays from './OtherDays'


function App() {
  const [cityInput, setCityInput] = useState('')
  const [city, setCity] = useState('istanbul')
  const [weatherData, setWeatherData] = useState(null)
  const [formattedWeatherData, setFormattedWeatherData] = useState(null)
  const [cityOpacity, setCityOpacity] = useState(0)
  const [isHillsVisible, setIsHillsVisible] = useState(false);



  //sehir ismi degistiginde animasyonu tetikler 
  useEffect(() => {
    setCityOpacity(0);     
    setTimeout(() => setCityOpacity(1), 100); 
  }, [formattedWeatherData?.location.region]); 

  useEffect(() => {
    setCity(cityInput)
  }, [cityInput])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=630b0db8e95e45998a7172611242409&q=${city}&days=9&aqi=yes&alerts=yes`)
        response.data.location.country === "Turkey" && setWeatherData(response.data)
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
  
  // mobilde sayfa altındaki resmin yuklenmesini geciktirir
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHillsVisible(true);
    }, 1000); // 1 saniye sonra görünür yap

    return () => clearTimeout(timer);
  }, []);
  
  const handleInputChange = (e) => {
    setCityInput(e.target.value)
  }
  

  

  return (
    <>
      <div className='main'>
        {/* mobil ekranı bulutlar */}
        <div className='cloud' style={{left:'18%', top:'6%'}} ></div>
        <div className='cloud' style={{left:'55%', top:'4%'}} ></div>
        <div className='cloud' style={{left:'88%', top:'8%'}} ></div>

        <motion.div className='top-section'  initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
          {formattedWeatherData && <TopSection formattedWeatherData={formattedWeatherData} cityInput={cityInput} handleInputChange={handleInputChange} cityOpacity={cityOpacity} />}
        </motion.div>
        {/* mobil ekranlarda asagi kaydirmayi hatirlatan ok */}
        <div className='arrow'>
          <Arrow/>
        </div>
        {formattedWeatherData && <OtherDays formattedWeatherData={formattedWeatherData}/>}
        <div className={`bg-hills ${isHillsVisible ? 'visible' : 'invisible'}`}/>
      </div>
    </>
  )
}

export default App
