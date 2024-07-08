import { useContext } from "react";

function SortByTitle() {
  const {allSermons} = useContext()
  return allSermons.sort((a, b) => {
    const titleA = a.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison
    const titleB = b.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0; // titles are equal
  });
}


const sortedItems = SortByTitle();

export default sortedItems