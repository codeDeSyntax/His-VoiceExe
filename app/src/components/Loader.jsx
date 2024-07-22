
import { motion } from 'framer-motion';

const Loader = () => {
 
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-background" id='triggerElement'>
      <motion.img
        src="./cloud.png"
        className="h-40 w-40"
        animate={{ rotate: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 1 }}
        alt="cloud"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-text text-2xl font-mono"
      >
        Welcome to his Voice....
        
      </motion.div>
    </div>
  );
};

export default Loader;
