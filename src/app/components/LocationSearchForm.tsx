"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import AutocompleteTextbox from "./form/AutocompleteTextbox";
import { MapboxSuggestion } from "../lib/definitions";
import {
  getLocationSuggestions,
  getMapLocationCoordinates,
} from "../actions/search";

type ListItemData = {
  name: string;
  id: string;
};

export default function LocationSearchForm() {
  const [selectedItem, setSelectedItem] = useState<ListItemData | null>(null);
  const [searchResults, setSearchResults] = useState<MapboxSuggestion[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const [formState, action, pending] = useActionState(getMapLocationCoordinates, undefined);
  const [sessionToken, setSessionToken] = useState<string>("");
  const formRef = useRef(null);

  const autocompleteListItemData: ListItemData[] = searchResults.map((item) => {
    let name = item.full_address || "";

    if (item.name && item.name !== "") {
      name = `${item.name} ${name}`;
    } else if (item.name_preferred && item.name_preferred !== "") {
      name = `${item.name_preferred} ${name}`;
    }

    return {
      id: item.mapbox_id,
      name: name,
    };
  });

  const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value ?? "");
  };

  const handleListItemClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    const target = evt.currentTarget;

    if (target) {
      const selectedItem: ListItemData = {
        name: target.textContent,
        id: target.dataset["value"] || "",
      };

      setSelectedItem(selectedItem);
      
      // submit form programmatically
      if (formRef.current) {
        const typedFormRef = formRef.current as HTMLFormElement;
        const locationIdEl = typedFormRef.children.namedItem("mapboxLocationId") as HTMLInputElement;
        locationIdEl.value = selectedItem.id;
        typedFormRef.requestSubmit();
      }
    }
  };

  useEffect(() => {
    let ignore = false;

    const searchLocations = async () => {
      let results: MapboxSuggestion[] = [];
      let token: string = "";

      if (!ignore && debouncedSearchText) {
        const data = await getLocationSuggestions(debouncedSearchText);
        results = data.suggestions;
        token = data.sessionToken;
      }

      setSearchResults(results);
      setSessionToken(token);
    };

    searchLocations();

    return () => {
      ignore = true;
    };
  }, [debouncedSearchText]);

  return (
    <form action={action} ref={formRef}>
      <AutocompleteTextbox
        id="search"
        name="search"
        data={autocompleteListItemData}
        onListItemClick={handleListItemClick}
        onTextChange={handleTextChange}
        placeholderText="Enter an address, neighborhood, city, or ZIP code"
      />
      <input type="hidden" name="sessionToken" value={sessionToken} />
      <input type="hidden" name="mapboxLocationId" value={selectedItem?.id || ""} />
    </form>
  );
}
