import { useEffect, useRef, useState } from "react";

import { useElementHasFocus } from "@/hooks/useElementHasFocus";
// TODO: add list item keyboard accessibility handling
// TODO: add default styling
// TODO: export into a shared components library - longer term

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
   * The delay (in milliseconds) used when debouncing inputs to the <input> element. Optional. Default is 250.
   * @type {number}
   */
  debounceDelay?: number;

  /**
   * The value for the 'placeholder' attribute of the <input> element. Optional. Default is "Search".
   * @type {string}
   */
  placeholderText?: string;

  /**
   * List items to display when the search query returns zero results. Optional.
   */
  defaultListItems?: React.JSX.Element[];

  /**
   * A function that generates elements for use in the list of search results using the provided item as input. Required.
   * @param {T} item
   * @returns {React.JSX.Element} a <li> element
   */
  listItemTemplateFn: (item: T) => React.JSX.Element;

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

/**
 * A search input component that displays a list of suggestions as the user types.
 * @param {SearchboxProps} props The properties of the Searchbox component
 */
export default function Searchbox<T>({
  id = "search",
  name = "search",
  textboxClassName,
  listClassName,
  outerWrapperClassName,
  innerWrapperClassName,
  buttonClassName,
  buttonIcon = (
    // Magnifying glass icon -- License: CC Attribution. Made by geakstr: https://github.com/geakstr/entypo-icons
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z" />
    </svg>
  ),
  debounceDelay = 250,
  placeholderText = "Search",
  defaultListItems = [],
  listItemTemplateFn,
  onButtonClick,
  searchFn,
}: SearchboxProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Array<T>>([]);
  const [listHoveredOver, setListHoveredOver] = useState(false);
  const debouncedSearchText = useDebounce(searchText, debounceDelay);
  const inputRef = useRef(null);
  const inputHasFocus = useElementHasFocus(inputRef.current);
  const showList = inputHasFocus || listHoveredOver;

  const listItems = searchResults.map((item) => {
    return listItemTemplateFn(item);
  });

  const listItemsToDisplay =
    searchResults.length > 0 ? listItems : defaultListItems;

  useEffect(() => {
    const fetchResults = async () => {
      const results = await searchFn(debouncedSearchText);
      setSearchResults(results);
    };

    fetchResults();
  }, [debouncedSearchText, searchFn]);

  const handleSearchTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = evt.target.value;
    setSearchText(searchText);
  };

  const handleButtonClick = () => {
    onButtonClick(searchResults[0]);
  };

  return (
    <div className={outerWrapperClassName}>
      <div className={innerWrapperClassName}>
        <input
          ref={inputRef}
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
          onMouseOver={() => setListHoveredOver(true)}
          onMouseOut={() => setListHoveredOver(false)}
        >
          {listItemsToDisplay}
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

/**
 * Control the frequency at which a value is updated in state, particularly
 * in response to rapidly occurring events like user input or window resizing.
 * @param {T} value the value that is changing quickly
 * @param {number} delay the delay to use, in milliseconds.
 * @returns {T} the debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
