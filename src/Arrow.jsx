import { motion } from 'framer-motion';
import arrow from './assets/down-chevron.png';

const Arrow = () => {

  return (
    <>
        <motion.div
            animate={{ opacity: [1, 0, 1, 0, 1, 0,]  }} // Yanıp sönme efekti
            transition={{ duration: 3, ease:'linear' }}  
        >
            <img width={50} height={50} src={arrow} alt="down" />

        </motion.div>
    </>
  );
};

export default Arrow;