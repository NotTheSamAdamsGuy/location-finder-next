"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ListItemData = {
  name: string;
  id: string;
};

type Props = {
  id?: string;
  name?: string;
  data?: Array<ListItemData>;
  className?: string;
  placeholderText?: string;
  onTextChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onListItemClick?: (evt: React.MouseEvent<HTMLLIElement>) => void;
};

export default function AutocompleteTextbox({
  id="autocomplete",
  name="autocomplete",
  data=[],
  className="",
  placeholderText="Search...",
  onTextChange,
  onListItemClick
}: Props) {
  const handleListItemClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    setShowList(false);
    setSearchText(evt.currentTarget.textContent);

    if (onListItemClick) {
      onListItemClick(evt);
    }
  };

  const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = evt.currentTarget.value;
    setSearchText(searchText);

    if (searchText === "") {
      setShowList(false);
    } else {
      if (!showList) setShowList(true);
    }

    if (onTextChange) {
      onTextChange(evt);
    }
  };

  const [searchText, setSearchText] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  
  const listItems = data.map((item) => (
    <ListItem
      key={`item-${item.id}`}
      item={item}
      onClick={handleListItemClick}
    />
  ));

  return (
    <>
      <label className={twMerge("input w-100", className)}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="search"
          placeholder={placeholderText}
          id={id}
          name={name}
          autoComplete="off"
          onChange={handleTextChange}
          value={searchText}
        />
      </label>
      <div className={`absolute ${showList ? "" : "hidden"}`}>
        <ul
          role="listbox"
          className="list bg-base-100 rounded-box shadow-md w-100 border border-base-300 absolute"
        >
          {listItems}
        </ul>
      </div>
    </>
  );
}

type ListItemProps = {
  item: ListItemData;
  onClick: (evt: React.MouseEvent<HTMLLIElement>) => void;
};

function ListItem({ item, onClick }: ListItemProps) {
  const handleClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    onClick(evt);
  };

  return (
    <li
      key={item.id}
      data-value={item.id}
      onClick={handleClick}
      className="hover:bg-base-300 w-100 px-3 py-1.5"
    >
      {item.name}
    </li>
  );
}
