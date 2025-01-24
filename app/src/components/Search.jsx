import { useContext, useState } from "react";
import { SermonContext } from "../Logic/SermonProvider";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ChevronDown, ChevronUp } from "lucide-react";
import earlySermons from "../sermons/1964-1969/firstset.js";
import secondSet from "../sermons/1970/1970";
import thirdSet from "../sermons/1971/1971";
import fourthSet from "../sermons/1972/1972";
import lastSet from "../sermons/1973/1973";

const Search = () => {
  const { setActiveTab, setSelectedMessage, setRecentSermons, setSearchQuery } =
    useContext(SermonContext);
  const [rightSearchText, setRightSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [expandedResults, setExpandedResults] = useState({});

  const sermonCollection = [
    ...earlySermons,
    ...secondSet,
    ...thirdSet,
    ...fourthSet,
    ...lastSet,
  ];

  const handleRightSearch = () => {
    const filtered = sermonCollection
      .map((sermon) => {
        const regex = new RegExp(`(${rightSearchText})`, "i");
        const match = sermon.sermon.match(regex);

        if (match) {
          // Get more context for the match
          const preContext = sermon.sermon.slice(
            Math.max(0, match.index - 200),
            match.index
          );
          const postContext = sermon.sermon.slice(
            match.index + match[0].length,
            match.index + match[0].length + 200
          );
          const shortSentence = sermon.sermon.slice(
            Math.max(0, match.index - 30),
            match.index + match[0].length + 30
          );

          return {
            id: sermon.id,
            title: sermon.title,
            year: sermon.year,
            location: sermon.location,
            shortSentence: shortSentence.replace(
              regex,
              `<highlight class='highlight'>${match[0]}</highlight>`
            ),
            fullContext: {
              pre: preContext,
              match: match[0],
              post: postContext,
            },
            sermon: sermon.sermon,
            type: sermon.type,
          };
        }
        return null;
      })
      .filter(Boolean);

    setSearchResults(filtered);
    setExpandedResults({});
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleRightSearch();
  };

  const handleSearchResultClick = (result) => {
    const sermon = sermonCollection.find((s) => s.id === result.id);
    setSelectedMessage(sermon);
    setActiveTab("message");
    setSearchQuery(rightSearchText);

    const recentSermons =
      JSON.parse(localStorage.getItem("recentSermons")) || [];
    const updatedRecentSermons = recentSermons.filter(
      (item) => item.id !== sermon.id
    );
    updatedRecentSermons.unshift(sermon);
    const limitedRecentSermons = updatedRecentSermons.slice(0, 15);
    localStorage.setItem("recentSermons", JSON.stringify(limitedRecentSermons));
    setRecentSermons(limitedRecentSermons);
  };

  const toggleExpanded = (resultId, event) => {
    event.stopPropagation();
    setExpandedResults((prev) => ({
      ...prev,
      [resultId]: !prev[resultId],
    }));
  };

  return (
    <div
      className="w-1/2 bg-opacity-50 bg-black backdrop-blur-sm flex flex-col "
      style={{ height: "100vh" }}
    >
      <div className="sticky top-0 bg-opacity-30 bg-primary p-8 z-10 backdrop-blur-lg rounded-b-md pt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-end">
            <input
              type="text"
              placeholder="Search quotes within all sermons"
              className="flex-grow p-2 text-lg border-b border-gray-300 focus:border-b-2 focus:border-gray-500 text-white placeholder-gray-300 bg-[transparent] outline-none"
              onChange={(e) => setRightSearchText(e.target.value)}
              value={rightSearchText}
              style={{ fontFamily: "cursive" }}
            />
            <Button
              type="submit"
              icon={<SearchOutlined />}
              className="ml-2 bg-green-600"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-hidden p-4">
        <p
          className="text-center font-sans text-sm italic text-white mb-4"
          style={{ fontFamily: "cursive" }}
        >
          Search for quotes across all sermons preached by Robert Lambert Lee
        </p>
        {searchResults.map((result, index) => (
          <div
            key={`${result.id}-${index}`}
            className="mb-4 p-3 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all"
            onClick={() => handleSearchResultClick(result)}
          >
            <h3 className="text-white font-bold mb-2 text-[.9rem] ">{result.title}</h3>
            <div className="relative">
              {expandedResults[result.id] ? (
                <div className="text-gray-300 text-sm">
                  <span className="opacity-70">{result.fullContext.pre}</span>
                  <highlight className="highlight">
                    {result.fullContext.match}
                  </highlight>
                  <span className="opacity-70">{result.fullContext.post}</span>
                </div>
              ) : (
                <p
                  className="text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: result.shortSentence }}
                ></p>
              )}
              <button
                className=" right-0 bottom-0 flex items-center text-gray-300 hover:text-white transition-colors p-1 text-xs"
                onClick={(e) => toggleExpanded(result.id, e)}
              >
                {expandedResults[result.id] ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Show More
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
