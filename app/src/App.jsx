import Hisvoice from "./components/Hisvoice";
import { useState,useEffect } from "react";


const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    window.addEventListener("load", handleLoad);

    // Fallback: Hide the loader after 3 seconds
    const timeout = setTimeout(() => setIsLoaded(true), 5000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="text-blue-500 text-lg scrollbar-hidden">
      {/* {isLoaded ? <Hisvoice /> : <Loader />} */}
      <Hisvoice />
      {/* <Songs/> */}
    </div>
  );
};

export default App;
