import React, { createContext, useState, useEffect } from 'react';
import earlySermons from '../sermons/1964-1969/firstset';
import secondSet from '../sermons/1970/1970';
import thirdSet from '../sermons/1971/1971';
import fourthSet from '../sermons/1972/1972';
import lastSet from '../sermons/1973/1973';
import audioSermons from '../sermons/audio';

const SermonContext = createContext();
const sermonCollection = [
  ...earlySermons,
  ...secondSet,
  ...thirdSet,
  ...fourthSet,
  ...lastSet,

]

const SermonProvider = ({ children }) => {
  const [selectedSermon, setSelectedSermon] = useState('');
  const [allSermons, setAllSermons] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [sermonsInTab, setSermonsInTab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRandomSermons = () => {
    let sermonIndex = Math.floor(Math.random() * sermonCollection.length);
    setSelectedSermon(sermonCollection[sermonIndex]);
  }

  useEffect(() => {
    handleRandomSermons();
    try {
      const fetchedSermons = [
        ...earlySermons,
        ...secondSet,
        ...thirdSet,
        ...fourthSet,
        ...lastSet,
        ...audioSermons
      ];
      setAllSermons(fetchedSermons);
      setLoading(false);
    } catch (err) {
      setError('Failed to load sermons');
      setLoading(false);
    }
  }, []);

  const addToSermonsInTab = (sermon) => {
    setSermonsInTab((prevSermons) => {
      if (prevSermons.length >= 8) {
        alert('This sermon won’t add to tab');
        return prevSermons;
      }
      if(sermon.hasOwnProperty('type')){
        alert('This sermon won’t add')
        return prevSermons
      }
      return [...prevSermons, sermon];
    });
  }

  const deleteSermonInTab = (sermon) => {
    setSermonsInTab(sermonsInTab.filter((sermonInTab) => sermonInTab.id !== sermon.id));
    // setSermonsInTab((prevSermons) => {
    //   return prevSermons.filter((sermonInTab) => sermonInTab !== sermon);
    // });
  };

  const displaySermonInTab = (sermon) => {
    setSelectedSermon(sermon)
  }


  const [settings, setSettings] = useState({
    textSize: '1',
    textColor: '',
    backgroundColor: '',
    fontFamily: 'monospace',
  });

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SermonContext.Provider value={{
      selectedSermon,
      setSelectedSermon,
      allSermons,
      setAllSermons,
      sermonsInTab,
      loading,
      error,
      addToSermonsInTab,
      deleteSermonInTab,
      displaySermonInTab,
      searchTerm,
      setSearchTerm,
      settings,
      updateSettings,
    }}>
      {children}
    </SermonContext.Provider>
  );
};

export { SermonContext, SermonProvider };
