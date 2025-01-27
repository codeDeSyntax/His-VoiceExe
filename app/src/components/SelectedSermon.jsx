import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { SermonContext } from "../Logic/SermonProvider";
import { Card, Button } from "antd";
import DownloadSermon from "./PlayDownload";
import { ImageIcon, Search, X, Info } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import SearchModal from "./SermonSearchModal";
import DarkModeToggle from "./ThemeSwitcher";


const SermonDetailsCard = ({ sermon }) => {
  return (
    <Card
      className="absolute right-0 mr-14 mt-24 bg-primary text-white w-64 shadow-lg"
      bordered={false}
    >
      <h3 className="text-lg font-bold mb-2">{sermon.title}</h3>
      <div className="text-sm space-y-2">
        <p>
          <span className="font-medium">Location:</span> {sermon.location}
        </p>
        <p>
          <span className="font-medium">Year:</span> {sermon.year || "N/A"}
        </p>
        <p>
          <span className="font-medium">Type:</span> {sermon.type}
        </p>
      </div>
    </Card>
  );
};

const SaveNotification = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute z-30 bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Progress saved successfully! ✓
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SelectedSermon = ({ background, setBackground }) => {
  const {
    selectedMessage,
    searchQuery,
    setSearchQuery,
    settings,
    setRecentSermons,
  } = useContext(SermonContext);

  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(
    selectedMessage?.lastRead || 0
  );
  const scrollContainerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLastReadCard, setShowLastReadCard] = useState(true);

  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showDetailsCard, setShowDetailsCard] = useState(false);

  const highlightEndnotes = (text) => {
    const endnoteRegex = /Endnote/gi;
    const parts = text.split(endnoteRegex);

    return (
      <span>
        {parts.map((part, i, arr) =>
          i < arr.length - 1 ? (
            <React.Fragment key={i}>
              {part}
              <span className="bg-yellow-500 text-black px-1 rounded" title="William branham qoute.🗝️🗝️ WMB qoute ends when you dont find the paragraph numbers anymore">
                Endnote
              </span>
            </React.Fragment>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const highlightText = useCallback((text, highlight) => {
    if (!highlight?.trim()) return <span>{text}</span>;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="text-green-400 border border-green-600 rounded-md"
              style={{
                backgroundColor: "green",
                padding: "4px",
              }}
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  }, []);

  const images = useMemo(
    () => ["./pic1.jpg", "./picc.jpg", "./pica.jpg", "./picd.jpg", "./picb.jpg"],
    []
  );

  useEffect(() => {
    const switchImage = () => {
      const newIndex = Math.floor(Math.random() * images.length);
      setCurrentImageIndex(newIndex);
    };

    const interval = setInterval(switchImage, 50000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  useEffect(() => {
    if (searchQuery && scrollContainerRef.current) {
      const highlights = scrollContainerRef.current.querySelectorAll("mark");
      if (highlights.length > 0) {
        highlights[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    const timer = setTimeout(() => setSearchQuery(""), 60000);
    return () => clearTimeout(timer);
  }, [searchQuery, setSearchQuery]);

  // function to navigate to previous and next matches
  


  // Modified scroll handling logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Save scroll position when unmounting or changing sermons
  useEffect(() => {
    if (!selectedMessage?.id) return;

    const saveScrollPosition = () => {
      const recentSermons =
        JSON.parse(localStorage.getItem("recentSermons")) || [];
      const currentSermonIndex = recentSermons.findIndex(
        (sermon) => sermon.id === selectedMessage.id
      );

      if (currentSermonIndex !== -1) {
        const updatedSermons = [...recentSermons];
        updatedSermons[currentSermonIndex] = {
          ...selectedMessage,
          lastRead: scrollPosition,
        };
        localStorage.setItem("recentSermons", JSON.stringify(updatedSermons));
        setRecentSermons(updatedSermons);
      }
    };

    // Save position when component unmounts or sermon changes
    return () => {
      saveScrollPosition();
    };
  }, [selectedMessage, scrollPosition, setRecentSermons]);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) setSearchQuery("");
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setShowSearch(false);
  };

  const backgroundStyle = background
    ? {
        backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 5) 40%),
          url(${images[currentImageIndex] || "./pic3.jpg"})`,
      }
    : {
        // backgroundColor: "#2c2c2c",
      };

  const scrollToPosition = (height) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: height,
        behavior: "smooth",
      });
    }
  };

  const handleCloseLastReadCard = () => {
    setShowLastReadCard(false);
  };

  // Add manual save function
  const handleManualSave = () => {
    if (!selectedMessage?.id) return;

    const recentSermons =
      JSON.parse(localStorage.getItem("recentSermons")) || [];
    const currentSermonIndex = recentSermons.findIndex(
      (sermon) => sermon.id === selectedMessage.id
    );

    if (currentSermonIndex !== -1) {
      const updatedSermons = [...recentSermons];
      updatedSermons[currentSermonIndex] = {
        ...selectedMessage,
        lastRead: scrollPosition,
      };
      localStorage.setItem("recentSermons", JSON.stringify(updatedSermons));
      setRecentSermons(updatedSermons);
    }
    setShowSaveNotification(true);
  };

  const toggleDetailsCard = () => {
    setShowDetailsCard((prev) => !prev);
  };

  return (
    <div className="">
      <SearchModal
        showSearch={showSearch}
        onClose={handleSearchToggle}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <SaveNotification
        show={showSaveNotification}
        onClose={() => setShowSaveNotification(false)}
      />

      <motion.div
        className="bg-cover bg-white dark:bg-primary bg-center flex flex-col p-5 relative pb-14"
        style={
          selectedMessage.type === "text"
            ? backgroundStyle
            : {
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundImage: `linear-gradient(to bottom,
                rgba(42, 42, 42, 0.5) 80%,
                rgba(42, 42, 42, .4) 90%),
                url("./icon.png")`,
              }
        }
      >
        <div className="w-full mb-5 h-[90vh] ">
          {selectedMessage.type === "text" && (
            <div className="absolute flex items-center justify-center right-0 mr-14 gap-2 p-2 rounded-l-full bg-primary mt-10">
              <button
                className="rounded-full h-10 w-10 hover:cursor-pointer hover:scale-125 duration-300 bg-secondary text-white font-bold text-center flex items-center justify-center"
                title="Save progress"
                onClick={handleManualSave}
              >
                📝
              </button>
              <button
                className="rounded-full h-10 w-10 hover:cursor-pointer hover:scale-125 duration-300 bg-secondary text-white font-bold text-center flex items-center justify-center"
                title="Toggle sermon details"
                onClick={toggleDetailsCard}
              >
                <Info size={20} />
              </button>
              <button
                className="rounded-full h-10 w-10 hover:cursor-pointer hover:scale-125 duration-300 bg-secondary text-white font-bold text-center flex items-center justify-center"
                title="Toggle background"
                onClick={() => setBackground(!background)}
              >
                {background ? "SB" : <ImageIcon />}
              </button>
              <button
                className="rounded-full h-10 w-10 hover:cursor-pointer hover:scale-125 duration-300 bg-secondary text-white font-bold text-center flex items-center justify-center"
                title="Search in sermon"
                onClick={handleSearchToggle}
              >
                <Search />
              </button>
              <DarkModeToggle/>
            </div>
          )}

          {showDetailsCard && selectedMessage.type === "text" && (
            <SermonDetailsCard sermon={selectedMessage} />
          )}

          <div
            ref={scrollContainerRef}
            className="rounded-lg p-8 h-[90vh] overflow-y-scroll text-text"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#4B5563 #202020",
            }}
          >
            {selectedMessage.type === "text" ? (
              <div className="w-full">
                {selectedMessage.lastRead && showLastReadCard && (
                  <Card
                    title="Welcome Back!"
                    bordered={false}
                    className="absolute right-0 mr-14 mb-4 bg-green-300 text-text"
                    style={{ width: 300, textAlign: "center" }}
                    actions={[
                      <Button
                        type="outline"
                        className="text-green-300 bg-green-700 "
                        onClick={() => {
                          scrollToPosition(scrollPosition);
                          setShowLastReadCard(false);
                        }}
                        key="continue"
                      >
                        Continue
                      </Button>,
                      <Button
                        type="outline"
                        onClick={handleCloseLastReadCard}
                        key="close"
                        className="text-white bg-green-700 hover:text-gray-300"
                      >
                        <X size={18} />
                      </Button>,
                    ]}
                  >
                    <p className="text-black">
                      You left off at this point in the sermon.
                    </p>
                  </Card>
                )}
                <p className=" text-3xl font-serif text-gray-900 dark:text-text font-bold underline">
                  {selectedMessage.title}
                </p>
                <p className=" font-serif italic text-gray-900 dark:text-text">
                  {selectedMessage?.location}
                </p>
                🔊
                {selectedMessage.sermon
                  ?.split("\n\n") 
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-6 leading-relaxed text-gray-900 dark:text-text font-cursive pt-3 "
                      style={{
                        fontFamily: settings.fontFamily,
                        fontWeight: settings.fontWeight,
                        fontSize: `${settings.fontSize}px`,
                        fontStyle: settings.fontStyle,
                      }}
                    >
                      {searchQuery
                        ? highlightText(paragraph, searchQuery)
                        : highlightEndnotes(paragraph)}
                    </p>
                  ))}
                🗝️
              </div>
            ) : (
              <DownloadSermon />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

SelectedSermon.propTypes = {
  background: PropTypes.bool.isRequired,
  setBackground: PropTypes.func.isRequired,
};

SearchModal.propTypes = {
  showSearch: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

SaveNotification.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

SermonDetailsCard.propTypes = {
  sermon: PropTypes.object.isRequired,
};

export default SelectedSermon;
