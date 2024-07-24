import React, { useState, useContext, useRef,useEffect } from 'react';
import { SermonContext } from '../components/GlobalState';
import { motion } from 'framer-motion';
import { Drawer, } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  SortAscendingOutlined,
  EyeInvisibleOutlined,
 
} from '@ant-design/icons';
import Home1 from './Home1';
import HomeContent from './HomeContent';
import SermonsContent from './SermonsContent';
import VideosContent from './VideosContent';
import SettingsContent from './SettingsContent';
import SongsContent from './SongContent';
import TitleDrop from './TitleDrop';
import YearDrop from './YearDrop';
import SermonList from './SermonList';
import TourComponent from '../components/Tour.js';
import FloatingSearchIcon from './Search';
// import { EllipsisOutlined } from '@ant-design/icons';
import { Button,  Tour } from 'antd';

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

const Home = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: 'Go to Home',
      description: 'Click to go to the home page.',
      cover: <img alt="tour.png" src="./eagle1.jpg" />,
      target: () => ref1.current,
    },
    {
      title: 'Sermons',
      description:
        'When you click this, you get to see a random sermon from Bob Lambert. Click to see more.',
      target: () => ref2.current,
    },
    {
      title: 'Images',
      description: 'Click to view message related images.',
      target: () => ref3.current,
    },
    {
      title: 'Settings',
      description:
        'You will be able to change the sermon text settings as you please.',
      target: () => ref4.current,
    },
    {
      title: 'Search',
      description: 'Search for a Quote withing the current sermon.',
      target: () => ref5.current,
    },
    {
      title: 'Side bar',
      description: 'See what happens in this side bar.',
      target: () => setIsSidebarVisible(true),
    },
    {
      title: 'Sort',
      description: 'Keep clicking to sort current list in different ways',
      target: () => ref6.current,
    },
    {
      title: 'Search within List',
      description: 'start typing to search for sermons',
      target: () => ref7.current,
    },
    {
      title: 'Sort by Year or Title',
      description: 'select letter or year to filter sermons ',
      target: () => ref8.current,
    },
    {
      title: 'Finished👍👍',
      description: 'You are done!',
      cover: <img alt="tour.png" src="./eagle2.jpg" />,
      target: () => setIsSidebarVisible(false),
    },
  ];

  const [runTour, setRunTour] = useState(false);
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
  const [ascending, setAscending] = useState(true);
  const [sermonSearch , setSermonSearch] = useState('');
  const sermonTextRef = useRef(null);

 useEffect(() => {
  setAllSermons(sermonCollection)
 }, [setAllSermons])

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeContent />;
      case 'Home1':
        return <Home1 sermonTextRef={sermonTextRef} />;
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
      return ascending
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });
    setAllSermons(sortedSermons);
    setAscending(!ascending);
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
    const originalText = paragraph.innerText;
    
    // Remove previous highlights and icons
    paragraph.innerHTML = originalText;
  
    if (input.length > 0) {
      const inputRegex = input.split(/\s+/).join('\\s*');
      const regex = new RegExp(`(${inputRegex})`, 'gi');
      
      let highlightedText = originalText;
      let match;
      let lastIndex = 0;
      const fragments = [];
  
      // Define the icon HTML
      const locationIconHtml = '<img src="./edit.png" class="location-icon" alt="Location Icon" style="vertical-align: middle; margin-right: 3px;  width: 16px; height: 16px;" />';
  
      while ((match = regex.exec(originalText)) !== null) {
        const matchStart = match.index;
        const matchEnd = regex.lastIndex;
  
        // Add the text before the match
        if (matchStart > lastIndex) {
          fragments.push(originalText.slice(lastIndex, matchStart));
        }
  
        // Add the highlighted match with an icon
        fragments.push(`<span class="highlight flex">${locationIconHtml}${match[0]}</span>`);
  
        lastIndex = matchEnd;
      }
  
      // Add any remaining text after the last match
      if (lastIndex < originalText.length) {
        fragments.push(originalText.slice(lastIndex));
      }
  
      highlightedText = fragments.join('');
  
      if (fragments.length > 1) {  // If we found any matches
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
        // If no matches, reset to original text
        paragraph.innerHTML = originalText;
        // Reset scroll position if no match is found
        window.scrollTo(0, 0);
      }
    }
  };

// Function to escape special characters for regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const searchByTitleOrYear = () => {
  // Sanitize the search input to escape any special regex characters
  const sanitizedSearch = escapeRegExp(sermonSearch);

  // Construct the regex with the sanitized search term
  let searchRegex;
  try {
    searchRegex = new RegExp(sanitizedSearch, 'i');
  } catch (e) {
    // Handle invalid regex error (fallback to a safe search)
    searchRegex = new RegExp('', 'i');
  }

  const filteredSermons = sermonCollection.filter((sermon) => 
    searchRegex.test(sermon.title) || searchRegex.test((sermon.year))
  );

  setAllSermons(filteredSermons);

  // Reset to all sermons if search input is empty
  if (sermonSearch.length === 0) {
    setAllSermons(sermonCollection);
  }
};


  
  

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex bg-background flex-col min-h-screen overflow-x-hidden home"
    >
      <header className="bg-background text-text fixed top-0 left-0 right-0 z-10 ">
        <div className="flex w-full items-center space-x-4 justify-between py-3">
          <div className="flex items-center justify-center gap-8 pr-10">
            <Button
              className="bg-[transparent] border-none"
              icon={<HomeOutlined className="text-text hover:text-[black]" />}
              onClick={() => setActiveTab('Home')}
              title="home"
              ref={ref1}
            />
            <Button
              className="bg-[transparent] border-none"
              icon={<BookOutlined className="text-text hover:text-[black]" />}
              onClick={() => {
                setActiveTab('Sermons');
                toggleSidebarVisibility();
              }}
              ref={ref2}
            />
            <Button
              className="bg-[transparent] border-none"
              icon={
                <VideoCameraOutlined className="text-text hover:text-[black]" />
              }
              onClick={() => setActiveTab('Videos')}
              title="media"
              ref={ref3}
            />
            <Button
              className="bg-[transparent] border-none"
              icon={
                <SettingOutlined
                  spin
                  className="text-text hover:text-[black]"
                />
              }
              onClick={() => setActiveTab('Settings')}
              title="settings"
              ref={ref4}
            />
            {activeTab === 'Sermons' && (
              // <Button type='primary' onClick={startTour}>
              //   Start Tour
              // </Button>
              <Button
                className="bg-textBlue text-[white] border-none shadow-inner  shadow-text"
                onClick={() => setOpen(true)}
              >
                See how it works
              </Button>
            )}
            {activeTab === 'Sermons' && (
              <FloatingSearchIcon searchText={searchText} ref5={ref5} />
            )}
            <TourComponent runTour={runTour} setRunTour={setRunTour} />
          </div>
        </div>
        {activeTab === 'Sermons' && (
          <div className="bg-lighter p-2 gap-3 flex items-center justify-between w-full ">
            <div className="">
              <p className="font-mono text-text">{selectedSermon?.title}</p>
              <p className="text-textBlue font-mono"> {selectedSermon?.date}</p>
            </div>
            {sermonsInTab.length > 0 && (
              <div className="flex items-center justify-center gap-2">
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
                    <Button
                      type="text"
                      icon={
                        <EyeInvisibleOutlined className="text-textBlue hover:text-text" />
                      }
                      className="text-textBlue text-[.5rem]  flex items-center justify-center cursor-pointer size-3 ease-in-out "
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteSermonInTab(sermon);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        mask={false}
        className="bg-textBlue"
        type="#427092"
        steps={steps}
      />
      <div className="flex   bg-[red]">
        <Drawer
          // title='sermons'
          placement="left"
          closable={false}
          onClose={toggleSidebarVisibility}
          open={isSidebarVisible && activeTab === 'Sermons'}
          width={400}
          bodyStyle={{ paddingBottom: 80, backgroundColor: '#171a1c' }}
          className="w-full "
        >
          <div className="mb-4 flex flex-col gap-2 fixed bg-background pt-8 pb-2 w-[28%] top-0">
            <Button
            ref={ref6}
              icon={<SortAscendingOutlined />}
              onClick={sortByTitle}
              className="w-full bg-textBlue text-[white] border-none shadow-inner  shadow-text"
            >
              Sort by Title
            </Button>
            <form className="flex items-center bg-background rounded-lg shadow-md">
              
              <input
              ref={ref7}
                type="text"
                onChange={(e) => {
                  console.log(sermonCollection[7])
                  // e.preventDefault();
                  setSermonSearch(e.target.value);
                  searchByTitleOrYear();
                }}
                className="px-4 py-2 rounded-l-lg focus:outline-none bg-lighter shadow-inner flex-1 shadow-text text-text"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 shadow-inner shadow-text  text-white rounded-r-lg bg-textBlue"
              >
                Search
              </button>
            </form>
            <div className="flex gap-2" ref={ref8}>
              <TitleDrop title="Sort by Title" id="title" />
              <YearDrop title="Sort by Year" id="year" />
            </div>
          </div>

          <SermonList setIsSidebarVisible={setIsSidebarVisible} />
        </Drawer>
        <main
          className="w-[100vw] flex flex-col"
          style={{
            backgroundImage: 'url(./darker.jpg)',
            backgroundSize: 'cover',
            width: '100vw',
            backgroundPosition: 'center',
          }}
        >
          <div
            className=""
            style={{
              // backgroundImage: settings.useImageBackground && 'url(/darker.jpg)',
              backgroundSize: 'cover',
              width: '100vw',
              backgroundPosition: 'center',
            }}
          >
            {renderContent()}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Home;
