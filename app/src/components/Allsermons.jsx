import { useContext, useState, useMemo } from 'react';
import { SermonContext } from '../Logic/SermonProvider';
import { Tooltip, Space } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FontSizeOutlined,
} from '@ant-design/icons';
import { LetterTextIcon } from 'lucide-react';
import Search from './Search.jsx';

const SermonList = () => {
  const {
    allSermons,
    loading,
    error,
    setActiveTab,
    setSelectedMessage,
    setRecentSermons,
  } = useContext(SermonContext);
  const [searchText, setSearchText] = useState('');
  const [sortKey, setSortKey] = useState('title');
  const [sortOrder, setSortOrder] = useState('ascend');

  const filteredSermons = useMemo(() => {
    return allSermons.filter((sermon) =>
      sermon.title.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  }, [allSermons, searchText]);

  const sortedSermons = useMemo(() => {
    return [...filteredSermons].sort((a, b) => {
      if (sortKey === 'year') {
        return sortOrder === 'ascend' ? a.year - b.year : b.year - a.year;
      }
      return sortOrder === 'ascend'
        ? a[sortKey].localeCompare(b[sortKey])
        : b[sortKey].localeCompare(a[sortKey]);
    });
  }, [filteredSermons, sortKey, sortOrder]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSermonClick = (sermon) => {
    setSelectedMessage(sermon);
    setActiveTab('message');

    const recentSermons =
      JSON.parse(localStorage.getItem('recentSermons')) || [];
    const updatedRecentSermons = recentSermons.filter(
      (item) => item.id !== sermon.id
    );
    updatedRecentSermons.unshift(sermon);
    const limitedRecentSermons = updatedRecentSermons.slice(0, 15);
    localStorage.setItem('recentSermons', JSON.stringify(limitedRecentSermons));
    setRecentSermons(limitedRecentSermons);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
    } else {
      setSortKey(key);
      setSortOrder('ascend');
    }
  };

  if (loading) return <div>Loading sermons...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="flex min-h-screen font-sans bg-contain bg-center "
      style={{
        backgroundImage: `
          linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.1) 100%),
          url('./icon.png')
        `,
      }}
    >
      {/* Left side - Sermon List */}
      <div
        className="w-1/2 overflow-y-auto scrollbar-hidden  "
        style={{ height: '100vh' }}
      >
        <div className="sticky top-0 bg-opacity-80 bg-primary px-4 py-2 z-10 backdrop-blur-sm rounded-b-md pt-10 ">
          <h2 className="text-lg font-bold text-white mb-2">Sermon List</h2>
          <Space
            className="mb-4"
            direction="vertical"
            style={{ width: '100%' }}
          >
            <input
              placeholder="Search sermons"
              onChange={handleSearch}
              className="flex-grow p-2 text-lg border-b border-gray-300 focus:border-b-2 focus:border-gray-500 text-white placeholder-gray-300 bg-[transparent] outline-none"
              style={{ width: '100%' }}
              // prefix={<SearchOutlined className="text-gray-300" />}
            />
            <Space className="w-full">
              <Tooltip title="Sort by Title">
                <button
                  onClick={() => handleSort('title')}
                  className={`p-2 rounded text-white ${
                    sortKey === 'title' ? 'bg-white bg-opacity-30' : ''
                  }`}
                >
                  <FontSizeOutlined />
                  {sortKey === 'title' &&
                    (sortOrder === 'ascend' ? (
                      <SortAscendingOutlined />
                    ) : (
                      <SortDescendingOutlined />
                    ))}
                </button>
              </Tooltip>
              <Tooltip title="Sort by Year">
                <button
                  onClick={() => handleSort('year')}
                  className={`p-2 rounded text-white ${
                    sortKey === 'year' ? 'bg-white bg-opacity-30' : ''
                  }`}
                >
                  <CalendarOutlined />
                  {sortKey === 'year' &&
                    (sortOrder === 'ascend' ? (
                      <SortAscendingOutlined />
                    ) : (
                      <SortDescendingOutlined />
                    ))}
                </button>
              </Tooltip>
              {/* <Tooltip title="Sort by Location">
                <button
                  onClick={() => handleSort("location")}
                  className={`p-2 rounded text-white ${
                    sortKey === "location" ? "bg-white bg-opacity-30" : ""
                  }`}
                >
                  <EnvironmentOutlined />
                  {sortKey === "location" &&
                    (sortOrder === "ascend" ? (
                      <SortAscendingOutlined />
                    ) : (
                      <SortDescendingOutlined />
                    ))}
                </button>
              </Tooltip> */}
            </Space>
          </Space>
        </div>
        <div className="px-4 scrollbar-hidden pt-5 ">
          {sortedSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="mb-4 border-b border-gray-500 pb-2 cursor-pointer hover:bg-[rgba(0,0,0,0.4)] "
              onClick={() => handleSermonClick(sermon)}
            >
              <p className="text-white text-[.8rem] font-medium">{sermon.title}</p>
              <div className="flex gap-3 text-gray-300">
                <p className="flex items-center text-xs font-mono">
                  <CalendarOutlined className="mr-1 text-blue-500" />{' '}
                  {sermon.year}
                </p>
                <p className="flex items-center text-xs font-mono">
                  <EnvironmentOutlined className="mr-1" />{' '}
                  {!sermon.location && 'N/A'}
                </p>
                <p className="flex items-center text-xs">
                  {sermon.type === 'mp3' ? '🔊' : <LetterTextIcon size={12} />}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Advanced Search */}
      <Search />
    </div>
  );
};

export default SermonList;
