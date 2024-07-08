import React, { useContext } from 'react';
import { SermonContext } from '../components/GlobalState';
import SolarSystem from '../components/Stars';
const SermonsContent = ({ sermonTextRef }) => {
  const { selectedSermon, settings } = useContext(SermonContext);

  const sermonTextStyle = {
    fontSize: `${settings.textSize}rem`,
    fontFamily: `${settings.fontFamily}`, // Convert textSize to rem units
  };

  return (
    <div className="p-4 min-h-screen bg-background flex flex-col items-center justify-start sem">
      <h3 className="text-[1.5rem] font-mono font-semibold text-text text-center mt-28 ">
        {selectedSermon.title}
      </h3>
      <p className="font-mono text-text text-center">{selectedSermon.date}</p>
      <SolarSystem />
      {selectedSermon.hasOwnProperty('type') ? (
        <>
          <audio controls className="mt-6">
            <source src={selectedSermon.audioUrl} type="audio/mp4" />
            <p className="text-text font-mono">
              This sermon is in audio format
            </p>
          </audio>
          <a href={selectedSermon.audioUrl} className="text-[blue] italic">
            {selectedSermon.audioUrl}
          </a>
        </>
      ) : (
        <div
          ref={sermonTextRef} // Attach the ref to the sermon text div
          className="sermonText w-[100%] font-bold text-center text-text break-words  font-mono "
          style={{
            ...sermonTextStyle,
            fontFamily: `${settings.fontFamily}`,
            backgroundColor: `${settings.backgroundColor}`,
            color: `${settings.textColor}`,
          }}


        >
           🔊 {selectedSermon.sermon} 🔑

        </div>
      )}
    </div>
  );
};

export default SermonsContent;
