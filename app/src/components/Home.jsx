import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { SermonContext } from '../components/GlobalState';
import { motion, AnimatePresence } from 'framer-motion';
import HomeContent from './HomeContent';
import SermonsContent from './SermonsContent';
import VideosContent from './VideosContent';
import SettingsContent from './SettingsContent';
import SongsContent from './SongContent';
import SearchBar from './SearchBar';
import YearDrop from './YearDrop';
import {
  FaHome,
  FaBook,
  FaVideo,
  FaCog,
  FaTimes,
  FaSort,
  FaEyeSlash,
} from 'react-icons/fa';
import TitleDrop from './TitleDrop';
import SermonList from './SermonList';
import TourComponent from '../components/Tour.js';

const Home = () => {
  const [runTour, setRunTour] = useState(false);

  const startTour = () => {
    setRunTour(true);
  };

  const {
    selectedSermon,
    sermonsInTab,
    setSelectedSermon,
    deleteSermonInTab,
    allSermons,
    setAllSermons,
  } = useContext(SermonContext);
  const [activeTab, setActiveTab] = useState('Home');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [ascending, setAscending] = useState(true); // State to manage ascending or descending order
  const sermonTextRef = useRef(null);
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeContent />;
      case 'Sermons':
        return <SermonsContent sermonTextRef={sermonTextRef} />;
      case 'Videos':
        return <VideosContent />;
      case 'Settings':
        return <SettingsContent />;
      case 'Songs':
        return <SongsContent />;
      default:
        return <HomeContent />;
    }
  };

  const sortByTitle = () => {
    const sortedSermons = [...allSermons].sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (ascending) {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    setAllSermons(sortedSermons);
    setAscending(!ascending); // Toggle between ascending and descending
  };

  const iconVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.9 },
  };

  const handleSermonClick = (sermon) => {
    setSelectedSermon(sermon);
  };

  const searchText = (searchTerm) => {
    const input = searchTerm
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, '');
    const paragraph = sermonTextRef.current;
    const text = paragraph.innerText.toLowerCase().replace(/[^\w\s]/g, '');

    // Remove previous highlights
    paragraph.innerHTML = paragraph.innerText;

    if (input.length > 0) {
      const inputRegex = input.split(/\s+/).join('\\s*');
      const regex = new RegExp(inputRegex, 'gi');
      const matches = text.match(regex);

      if (matches) {
        let highlightedText = paragraph.innerHTML;

        matches.forEach((match) => {
          // Create a regex for the original match in the paragraph with punctuation and spaces
          const originalMatchRegex = new RegExp(
            match.split('').join('[^\\w\\s]*'),
            'i'
          );
          const originalMatchArray =
            paragraph.innerText.match(originalMatchRegex);

          if (originalMatchArray) {
            const originalMatch = originalMatchArray[0];
            highlightedText = highlightedText.replace(
              new RegExp(
                originalMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                'gi'
              ),
              `<span class="highlight">$&</span>`
            );
          }
        });

        paragraph.innerHTML = highlightedText;

        // Scroll to the first highlighted text
        const highlightElement = paragraph.querySelector('.highlight');
        if (highlightElement) {
          highlightElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      } else {
        // Reset scroll position if no match is found
        window.scrollTo(0, 0);
      }
    }
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((prevState) => !prevState); // Toggle based on previous state
    console.log(!isSidebarVisible); // This will still show the old state due to the async nature of setState
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen overflow-hidden home"
    >
      <header className="bg-background text-text fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-4 p-3 justify-between">
          {activeTab === 'Sermons' ? (
            <div className="flex items-center justify-center gap-4">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#1f2937]">
                {!isSidebarVisible ? (
                  <FaBook
                    size={22}
                    className="text-text hover:cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveTab('Sermons');
                      toggleSidebarVisibility(); // Use the toggle function
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleSidebarVisibility(); // Use the toggle function
                    }}
                    className="hover:cursor-pointer"
                  />
                )}
              </div>
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center bg-[#1f2937] cursor-pointer"
                onClick={sortByTitle}
              >
                <FaSort size={22} title="sort" id="sort" />
              </div>
              <TitleDrop title="sort by title" id="title" />
              <YearDrop title="sort by year" id="year" />
              <SearchBar searchText={searchText} id="search" />
            </div>
          ) : (
            ''
          )}
          <div className="flex items-center justify-center gap-8 pr-10">
            <motion.div
              className="cursor-pointer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setActiveTab('Home')}
            >
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center bg-[#1f2937]"
                id="home"
              >
                <FaHome size={22} title="home" />
              </div>
            </motion.div>
            <motion.div
              className="cursor-pointer h-10 w-10 rounded-full flex items-center justify-center bg-[#1f2937]"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('Sermons');
              }}
            >
              {!isSidebarVisible ? (
                <FaBook
                  size={22}
                  className="text-text hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTab('Sermons');
                    toggleSidebarVisibility(); // Use the toggle function
                  }}
                />
              ) : (
                <FaEyeSlash
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleSidebarVisibility(); // Use the toggle function
                  }}
                  className="hover:cursor-pointer"
                />
              )}
            </motion.div>
            <motion.div
              className="cursor-pointer h-10 w-10 rounded-full flex items-center justify-center bg-[#1f2937]"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setActiveTab('Videos')}
            >
              <FaVideo size={22} title="media" id="media" />
            </motion.div>
            <motion.div
              className="cursor-pointer h-10 w-10 rounded-full flex items-center justify-center bg-[#1f2937]"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setActiveTab('Settings')}
            >
              <FaCog
                size={22}
                className="animate-spin"
                title="settings"
                id="settings"
              />
            </motion.div>
            <video
              autoPlay
              loop
              className="h-14 w-14 rounded-lg transition duration-300 ease-in-out transform
              hover:scale-[9] hover:shadow-lg
              hover:translate-y-[25vh] hover:translate-x-[30%]
              focus:scale-[1.2] focus:shadow-lg
              focus:-translate-y-[18vh] focus:translate-x-[20%]"
            >
              <source
                src="./vid.webm"
                type="video/webm"
                className="rounded-lg"
              />
            </video>
            {activeTab === 'Sermons' ? (
              <button
                onClick={startTour}
                className="bg-button hover:bg-button text-[white] font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Start Tour
              </button>
            ) : (
              ''
            )}
            <TourComponent runTour={runTour} setRunTour={setRunTour} />
          </div>
        </div>
        {activeTab === 'Sermons' ? (
          <div className="bg-lighter p-2 gap-3 flex items-center justify-between">
            <div className="">
              <p className="font-mono text-text">{selectedSermon?.title}</p>
              <p className="text-textBlue font-mono"> {selectedSermon?.date}</p>
            </div>
            {sermonsInTab.length > 0 ? (
              <div className="flex item-center justify-center gap-2">
                {sermonsInTab.map((sermon) => (
                  <div
                    className="flex items-center justify-center p-2 rounded-lg bg-background gap-2 hover:cursor-pointer group"
                    key={sermon.id}
                  >
                    <p
                      className="text-[.7rem]"
                      onClick={() => handleSermonClick(sermon)}
                    >
                      {sermon.title.slice(0, 10)}
                    </p>
                    <FaTimes
                      className="text-textBlue text-[.5rem] cursor-pointer size-3 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300 ease-in-out transform group-hover:scale-110"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteSermonInTab(sermon);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </header>
      <div className="flex pt-16">
        <AnimatePresence>
          {isSidebarVisible && activeTab === 'Sermons' && (
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3 }}
              className="w-[24rem] bg-gradient-to-b from-background to-lighter text-white p-4 overflow-y-auto fixed inset-y-0 mt-[8rem]"
            >
              <SermonList setIsSidebarVisible={setIsSidebarVisible} />
            </motion.aside>
          )}
        </AnimatePresence>
        <main
          className={`w-[100vw] flex flex-col ${
            isSidebarVisible && activeTab === 'Sermons' ? '' : ''
          }`}
          style={{
            backgroundImage: 'url(darker.jpg)',
            backgroundSize: 'cover',
            width: '100vw',
            backgroundPosition: 'center',
          }}
        >
          <div className="scroll">{renderContent()}</div>
        </main>
      </div>
    </motion.div>
  );
};

export default Home;
