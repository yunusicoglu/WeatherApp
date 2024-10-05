import React from 'react'
import { motion } from 'framer-motion'

const OtherDays = ({formattedWeatherData}) => {

	//sira sira gelme animasyonu
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
    </>
  )
}

export default OtherDays