import { motion } from 'framer-motion';
import arrow from './assets/down-chevron.png';

const Arrow = () => {

  return (
    <>
        <motion.div
            animate={{ opacity: [0, 0.7, 0, 0.7, 0, 0.7, 0,]  }} // Yanıp sönme efekti
            transition={{ duration: 2, ease:'ease-in' }}  
        >
            <img width={50} height={50} src={arrow} alt="down" />

        </motion.div>
    </>
  );
};

export default Arrow;