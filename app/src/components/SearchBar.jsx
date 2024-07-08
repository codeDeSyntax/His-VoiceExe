import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SermonContext } from '../components/GlobalState';

const SearchBar = ({ searchText }) => {
  const { searchTerm, setSearchTerm } = useContext(SermonContext);

  const handleSearch = (e) => {
    e.preventDefault();
    searchText(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center " id='search'>
      <div className="relative w-[18rem] h-12">
        <input
          type="text"
          spellCheck="false"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full px-4 pr-10 rounded-full bg-[#1f2937] border-2 border-gray-700 focus:outline-none focus:border-button transition-colors duration-300 shadow-md text-white placeholder-text"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#1f2937] rounded-full flex items-center justify-center shadow-sm hover:bg-background transition-colors duration-300"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
