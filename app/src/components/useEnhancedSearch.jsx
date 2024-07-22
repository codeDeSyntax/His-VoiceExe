import { useRef, useCallback } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const useEnhancedSearch = (sermonTextRef) => {
  const matchesRef = useRef([]);

  const searchText = useCallback((searchTerm) => {
    const input = searchTerm.trim().toLowerCase().replace(/[^\w\s]/g, '');
    const paragraph = sermonTextRef.current;

    // Reset matches
    matchesRef.current = [];

    // Check if paragraph exists and has innerText
    if (!paragraph?.innerText) {
      console.warn('Sermon text not available for search');
      return;
    }

    const text = paragraph.innerText.toLowerCase().replace(/[^\w\s]/g, '');

    // Remove previous highlights
    paragraph.innerHTML = paragraph.innerText;

    if (input.length > 0) {
      const words = input.split(/\s+/);
      const regex = new RegExp(words.map(word => `(?=.*${word})`).join('') + '.+', 'gi');
      const matches = text.match(regex);

      if (matches) {
        let highlightedText = paragraph.innerHTML;

        matches.forEach((match, index) => {
          const originalMatchRegex = new RegExp(match.split('').join('[^\\w\\s]*'), 'i');
          const originalMatchArray = paragraph.innerText.match(originalMatchRegex);

          if (originalMatchArray) {
            const originalMatch = originalMatchArray[0];
            const escapedMatch = originalMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const uniqueId = `match-${index}`;
            
            highlightedText = highlightedText.replace(
              new RegExp(escapedMatch, 'gi'),
              `<span id="${uniqueId}" class="highlight relative">$&<span class="absolute -top-5 left-0"><FaMapMarkerAlt className="text-blue-500" /></span></span>`
            );

            matchesRef.current.push(uniqueId);
          }
        });

        paragraph.innerHTML = highlightedText;

        // Scroll to the first highlighted text
        if (matchesRef.current.length > 0) {
          const firstMatch = document.getElementById(matchesRef.current[0]);
          if (firstMatch) {
            firstMatch.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      } else {
        // Reset scroll position if no match is found
        window.scrollTo(0, 0);
      }
    }
  }, [sermonTextRef]);

  return { searchText, matchesRef };
};

export default useEnhancedSearch;