import React, { useState, useContext, useRef, useEffect } from 'react';
import { SermonContext } from '../components/GlobalState';

const FloatingSearchIcon = ({ searchText,ref5 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(SermonContext);
  const searchContainerRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    searchText(searchTerm);
    setIsExpanded(false);
  };

  const toggleSearch = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  useEffect(() => {
    if (isExpanded && searchContainerRef.current) {
      const inputElement = searchContainerRef.current.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isExpanded && (
        <div ref={searchContainerRef} className="relative">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-background rounded-lg shadow-md"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-l-lg focus:outline-none bg-lighter shadow-inner shadow-text"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 shadow-inner shadow-text  text-white rounded-r-lg bg-textBlue"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="h-8 w-8 rounded-full bg-button text-[white] ml-2 "
            >
              ✕
            </button>
          </form>
        </div>
      )}
      <button
      ref={ref5}
        onClick={toggleSearch}
        className={`p-2 text-text bg-button h-8 w-8 rounded-full flex items-center justify-center ${
          isExpanded && 'hidden'
        }`}
      >
        {isExpanded ? '✕' : '🔍'}
      </button>
    </div>
  );
}

export default FloatingSearchIcon;
