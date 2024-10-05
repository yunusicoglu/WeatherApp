import React from 'react'
import { motion } from 'framer-motion'
import { CiSearch } from 'react-icons/ci'


const TopSection = ({formattedWeatherData, cityInput, handleInputChange, cityOpacity}) => {
  return (
    <>
      <motion.div className='city-name' initial={{opacity:0}} animate={{opacity:cityOpacity}}>{formattedWeatherData?.location.region}</motion.div>
      <div className='div-input' >
        <input 
            className='city-input' 
            type="text"
            value={cityInput} 
            onChange={handleInputChange}
            placeholder='Bir şehir giriniz...'
        />
        <div className='div-icon'>
          <motion.div
          animate={{
            x: [0, 3, -1, 2, 4, 0],
            y: [0, -2, 1, -2, 1, 0],
            scale: [1, 1.1, 1, 0.9, 1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity, 
            ease: 'linear', 
            times: [0, 0.20, 0.40, 0.70, 0.85, 1]
          }}
          >
            <CiSearch style={{ color: 'white', fontSize: '30px', marginRight: '10px' }} />
          </motion.div>
        </div>
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
    </>
  )
}

export default TopSection