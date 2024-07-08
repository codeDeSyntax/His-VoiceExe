import React, { useContext } from 'react';
import { SermonContext } from '../components/GlobalState';
import { FaArrowRight } from 'react-icons/fa';
// import YearDrop from './YearDrop';
// import TitleDrop from './TitleDrop';

const SermonList = ({ setIsSidebarVisible }) => {
  const { allSermons, setSelectedSermon, addToSermonsInTab } =
    useContext(SermonContext);

  const handleSermonClick = (sermon) => {
    setSelectedSermon(sermon);
    addToSermonsInTab(sermon);
    setIsSidebarVisible(true);
  };

  return (
    <div className="sermonList">
      {/* <div className="">
       <YearDrop/>
       <TitleDrop/>
       </div> */}
      <ul>
        {allSermons.map((sermon, index) => (
          <li
            key={index}
            onClick={() => handleSermonClick(sermon)}
            className={`w-full z-50 flex items-center justify-between group hover:cursor-pointer hover:bg-gray-800 ${
              index % 2 === 0 ? 'bg-[#3d4043]' : 'bg-[#303336]'
            }`}
          >
            <div className="p-2">
              <p className="text-[.8rem] text-text">{sermon.title}</p>
              <p className="text-[.6rem] text-[#3eb7ee] font-mono">
                {sermon.date}
                {sermon.hasOwnProperty('type') ? ' - 🔊' : ''}
              </p>
              <p className="text-[.5rem] text-text">{sermon.location}</p>
            </div>
            <FaArrowRight className="text-text opacity-0 mr-2 group-hover:opacity-100 duration-500" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SermonList;
