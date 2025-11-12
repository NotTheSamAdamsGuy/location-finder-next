import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

// TODO: add internal debounce function so we don't have any dependencies other than React
// TODO: add list item keyboard accessibility handling
// TODO: export into a shared components library
// TODO: add default styling

/**
 * Represents the properties of the Searchbox component.
 */
interface SearchboxProps<T> {
  /**
   * The value for the 'id' attribute of the <input> element. Optional.
   * @type {string}
   */
  id?: string;

  /**
   * The value for the 'name' attribute of the <input> element. Optional.
   * @type {string}
   */
  name?: string;

  /**
   * The value for the 'className' attribute of the <input> element. Optional.
   * @type {string}
   */
  textboxClassName?: string;

  /**
   * The value for the 'className' attribute of the <ul> element containing the search results. Optional.
   * @type {string}
   */
  listClassName?: string;

  /**
   * The value for the 'className' attribute of the <div> element wrapping the entire component. Optional.
   * @type {string}
   */
  outerWrapperClassName?: string;

  /**
   * The value for the 'className' attribute of the <div> element wrapping everything but the <button> element. Optional.
   * @type {string}
   */
  innerWrapperClassName?: string;

  /**
   * The value for the 'className' attribute of the <button> element. Optional.
   * @type {string}
   */
  buttonClassName?: string;

  /**
   * The element to use as the button's text. Optional. Default is an SVG icon of a magnifying glass.
   * @type {React.ReactNode}
   */
  buttonIcon?: React.ReactNode;

  /**
   * The frequency (in milliseconds) used when debouncing inputs to the <input> element. Optional. Default is 250.
   * @type {number}
   */
  debounceRate?: number;

  /**
   * The value for the 'placeholder' attribute of the <input> element. Optional. Default is "Search".
   * @type {string}
   */
  placeholderText?: string;

  /**
   * A function that generates elements for use in the list of search results using the provided item as input. Required.
   * @param {T} item 
   * @returns {React.JSX.Element} a <li> element
   */
  listItemTemplate: (item: T) => React.JSX.Element;

  /**
   * A click event handler for the <button> element.
   * @param {T} selectedItem the item associated with the first element in the list of search results.
   */
  onButtonClick: (selectedItem: T) => void;

  /**
   * A function that populates the list of search results.
   * @param {string} searchText the search input text.
   * @returns {Promise<Array<T>>} a Promise resolving to an array of search result items.
   */
  searchFn: (searchText: string) => Promise<Array<T>>;
}

export default function Searchbox<T>({
  id = "search",
  name = "search",
  textboxClassName,
  listClassName,
  outerWrapperClassName,
  innerWrapperClassName,
  buttonClassName,
  // Magnifying glass icon -- License: CC Attribution. Made by geakstr: https://github.com/geakstr/entypo-icons
  buttonIcon = (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z" />
    </svg>
  ),
  debounceRate = 250,
  placeholderText = "Search",
  listItemTemplate,
  onButtonClick,
  searchFn,
}: SearchboxProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Array<T>>([]);
  const [showList, setShowList] = useState(false);
  const debouncedSearchText = useDebounce(searchText, debounceRate);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await searchFn(debouncedSearchText);
      setSearchResults(results);
      if (results.length > 0) {
        setShowList(true);
      } else {
        setShowList(false);
      }
    };

    fetchResults();
  }, [debouncedSearchText, searchFn]);

  const handleSearchTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = evt.target.value;
    setSearchText(searchText);
  };

  const listItems = searchResults.map((item) => {
    return listItemTemplate(item);
  });

  const handleButtonClick = () => {
    onButtonClick(searchResults[0]);
  };

  return (
    <div className={outerWrapperClassName}>
      <div className={innerWrapperClassName}>
        <input
          id={id}
          name={name}
          autoComplete="off"
          type="search"
          value={searchText}
          onChange={handleSearchTextChange}
          className={textboxClassName}
          placeholder={placeholderText}
        />
        <ul
          role="listbox"
          style={{ display: showList ? "block" : "none" }}
          className={listClassName}
        >
          {listItems}
        </ul>
      </div>
      <button
        className={buttonClassName}
        type="button"
        onClick={handleButtonClick}
      >
        {buttonIcon}
      </button>
    </div>
  );
}
