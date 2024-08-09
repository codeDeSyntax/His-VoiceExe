import React, { useState, useContext, useRef, useEffect } from 'react';
import { SermonContext } from '../components/GlobalState';

const FloatingSearchIcon = ({ ref5, sermonTextRef }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const { searchTerm, setSearchTerm } = useContext(SermonContext);
  const searchContainerRef = useRef(null);

  // Handler to perform search when form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  // Search function to highlight matches
  const performSearch = (term) => {
    if (!term || !sermonTextRef.current) return;

    clearHighlights(); // Clear previous highlights

    const contentElement = sermonTextRef.current;
    const regex = new RegExp(term, 'gi');
    const matchesArray = [];

    contentElement.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        // Text node
        const text = node.nodeValue;
        let match;
        let lastIndex = 0;

        while ((match = regex.exec(text)) !== null) {
          const matchedText = document.createElement('span');
          matchedText.className = 'highlight';
          matchedText.textContent = match[0];

          const beforeMatch = document.createTextNode(
            text.slice(lastIndex, match.index)
          );
          const afterMatch = document.createTextNode(
            text.slice(regex.lastIndex)
          );

          const parent = node.parentNode;
          parent.insertBefore(beforeMatch, node);
          parent.insertBefore(matchedText, node);
          node.nodeValue = afterMatch.nodeValue;

          lastIndex = regex.lastIndex;

          matchesArray.push(matchedText);
        }
      }
    });

    setMatches(matchesArray);
    setCurrentMatchIndex(matchesArray.length > 0 ? 0 : -1);

    if (matchesArray.length > 0) {
      matchesArray[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Function to clear highlights
  const clearHighlights = () => {
    if (!sermonTextRef.current) return;

    const contentElement = sermonTextRef.current;
    const highlights = contentElement.querySelectorAll('.highlight');

    highlights.forEach((highlight) => {
      const textNode = document.createTextNode(highlight.textContent);
      highlight.parentNode.replaceChild(textNode, highlight);
    });

    setMatches([]);
    setCurrentMatchIndex(-1);
  };

  // Navigation functions
  const nextMatch = () => {
    if (matches.length === 0) return;

    setCurrentMatchIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % matches.length;
      matches[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return newIndex;
    });
  };

  const prevMatch = () => {
    if (matches.length === 0) return;

    setCurrentMatchIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + matches.length) % matches.length;
      matches[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return newIndex;
    });
  };

  // Toggle search bar
  const toggleSearch = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Close search bar
  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
    clearHighlights();
  };

  // Focus on input when search is expanded
  useEffect(() => {
    if (isExpanded && searchContainerRef.current) {
      const inputElement = searchContainerRef.current.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isExpanded]);

  // Handle clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
        clearHighlights();
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
              className="px-4 py-2 bg-blue-500 shadow-inner shadow-text text-white rounded-r-lg bg-textBlue"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="h-8 w-8 rounded-full bg-button text-[white] ml-2"
            >
              ✕
            </button>
          </form>

          {matches.length > 0 && (
            <div className="mt-2 flex items-center justify-between bg-lighter p-2 rounded-lg shadow-inner shadow-text">
              <div>
                {currentMatchIndex + 1} of {matches.length} matches
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={prevMatch}
                  className="px-2 py-1 bg-gray-300 rounded-l-md text-black"
                >
                  &#9664;
                </button>
                <button
                  type="button"
                  onClick={nextMatch}
                  className="px-2 py-1 bg-gray-300 rounded-r-md text-black"
                >
                  &#9654;
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <button
          ref={ref5}
          onClick={toggleSearch}
          className={`p-2 text-text bg-button h-8 w-8 rounded-full flex items-center justify-center ${
            isExpanded ? 'hidden' : ''
          }`}
        >
          {isExpanded ? '✕' : '🔍'}
        </button>
      </div>
    </div>
  );
};

export default FloatingSearchIcon;
