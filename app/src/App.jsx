import React, { useState, useEffect } from 'react';
import Home from "./components/Home";
import { SermonProvider } from "./components/GlobalState";
import Loader from "./components/Loader"

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or resource loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    },6000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
 

  return (
    <SermonProvider>
      <Home />
    </SermonProvider>
  );
}
