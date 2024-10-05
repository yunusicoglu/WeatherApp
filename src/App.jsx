import { useEffect, useRef } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { CiSearch } from 'react-icons/ci'
import { motion } from 'framer-motion'
import Arrow from './Arrow'


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

  //other days' animation
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3, 
        staggerChildren: 0.2
      }
    }
  };  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  

  return (
    <>
        
      <div className='main'>
        {/* mobil ekranı bulutlar */}
        <div className='cloud' style={{left:'18%', top:'6%'}} ></div>
        <div className='cloud' style={{left:'55%', top:'4%'}} ></div>
        <div className='cloud' style={{left:'88%', top:'8%'}} ></div>

        <motion.div className='top-section'  initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
          <motion.div className='city-name' initial={{opacity:0}} animate={{opacity:cityOpacity}}>{formattedWeatherData?.location.region}</motion.div>
          <div className='div-input' >
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
                <motion.div key={formattedWeatherData?.location.region}
                  animate={{
                    filter: ["blur(0px)", "blur(25px)", "blur(0px)"], // Sadece blur efekti
                  }}
                  transition={{
                    duration: 0.4, // Animasyon süresi
                    ease: "easeOut", // Geçiş şekli
                  }}
                >
                  <div style={{display:"flex", justifyContent:"center"}}>
                    <img 
                      src={formattedWeatherData?.forecast.forecastday[0].day.condition.icon} 
                      alt={formattedWeatherData?.forecast.forecastday[0].day.condition.text} 
                    />
                  </div>
                  <div style={{display:"flex", justifyContent:"center", fontSize:"20px"}}>
                    {Math.floor(formattedWeatherData?.forecast.forecastday[0].day.avgtemp_c)}°
                  </div>
                </motion.div>
              </div>
            )}
          </div>
          {/* kisa ekranlarda asagi kaydirmayi hatirlatan ok */}
          <div className='arrow'>
            <Arrow/>
          </div>
        </motion.div>
        { formattedWeatherData &&
          (
            <motion.div className='div-all-other-days' 
              variants={container}
              initial="hidden"
              animate="visible">

              {formattedWeatherData.forecast.forecastday.map((day,i) => (
                i === 0 
                ? null 
                : (
                    <motion.div className='div-other-days' key={day.date} variants={item}>
                      <div className='other-days'>
                        <div style={{display:"flex", justifyContent:"center", fontSize:"22px"}}>
                          {day.dayname}
                        </div>
                        <div style={{display:"flex", justifyContent:"center", fontSize:"13px", marginTop:"5px"}}>
                          ({day.date})
                        </div>
                        <motion.div key={formattedWeatherData?.location.region}
                          animate={{
                            filter: ["blur(0px)", "blur(25px)", "blur(0px)"], // Sadece blur efekti
                          }}
                          transition={{
                            duration: 0.4, // Animasyon süresi
                            ease: "easeOut", // Geçiş şekli
                          }} 
                        >
                          <div style={{display:"flex", justifyContent:"center"}}>
                            <img 
                              src={day.day.condition.icon} 
                              alt={day.day.condition.text} 
                            />
                          </div>
                          <div style={{display:"flex", justifyContent:"center", fontSize:"20px"}}>
                            {Math.floor(day.day.avgtemp_c)}°
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                )
              ))} 
            </motion.div>
          )
        }
        <div className={`bg-hills ${isHillsVisible ? 'visible' : 'invisible'}`}/>
      </div>
    </>
  )
}

export default App
