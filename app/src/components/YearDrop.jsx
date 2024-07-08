import React, { useState, useRef, useEffect, useContext } from 'react';
import { SermonContext } from './GlobalState';
import earlySermons from '../sermons/1964-1969/firstset';
import secondSet from '../sermons/1970/1970';
import thirdSet from '../sermons/1971/1971';
import fourthSet from '../sermons/1972/1972';
import lastSet from '../sermons/1973/1973';
import audioSermons from '../sermons/audio';

const sermonCollection = [
  ...earlySermons,
  ...secondSet,
  ...thirdSet,
  ...fourthSet,
  ...lastSet,
  ...audioSermons
];

const YearDrop = () => {
  const { setAllSermons } = useContext(SermonContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredSermons, setFilteredSermons] = useState(sermonCollection);
  const dropdownRef = useRef(null);

  const years = [
     '1964', '1965', '1966', '1967', '1968',
    '1969', '1970', '1971', '1972', '1973', 
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setAllSermons(filteredSermons);
  }, [filteredSermons, setAllSermons]);

  const filterByYear = (e) => {
    const year = e.target.textContent;
    const yearFiltered = sermonCollection.filter((eachSermon) => {
      return eachSermon.year === year;
    });

    setFilteredSermons(yearFiltered);
    setDropdownOpen(false); // Close the dropdown after filtering
  };

  const resetFilter = () => {
    setFilteredSermons(sermonCollection);
    setDropdownOpen(false);
  };

  return (
    <div className="relative z-40 inline-block text-left" ref={dropdownRef} id='year'>
      <button
        onClick={toggleDropdown}
        className="text-[white] bg-[#2563eb] focus:ring-4 shadow-sm focus:outline-none focus:ring-[white] font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center"
        type="button"
      >
        Year
        <svg
          className={`w-2.5 h-2.5 ml-3 transform ${dropdownOpen ? 'rotate-90' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="z-50 absolute left-[4rem] p-4 mt-4 bg-background shadow-text rounded-lg shadow w-96">
          <div className="grid grid-cols-5 gap-1 py-2 text-sm text-gray-200">
            {years.map((year) => (
              <div
                onClick={filterByYear}
                key={year}
                className="h-6 w-14 text-text text-center flex items-center justify-center px-2 py-2 bg-[#1f2937] rounded cursor-pointer"
              >
                {year}
              </div>
            ))}
            <div
              onClick={resetFilter}
              className="col-span-5 h-6 w-14 text-center flex items-center justify-center px-2 py-2 bg-gray-700 rounded cursor-pointer"
            >
              Reset
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearDrop;
