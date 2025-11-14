"use client";

import Image, { StaticImageData } from "next/image";
import { useActionState, useCallback, useRef, useState } from "react";
import { MapboxSuggestion } from "@notthesamadamsguy/location-finder-types";

import {
  getLocationSuggestions,
  getMapLocationCoordinates,
} from "@/formActions/search";
import Searchbox from "@/components/ui/Searchbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

type ListItemData = {
  name: string;
  id: string;
};

export default function HeroSearchForm({
  background,
}: {
  background: StaticImageData;
}) {
  const [selectedItem, setSelectedItem] = useState<ListItemData | null>(null);
  const [formState, action, pending] = useActionState(
    getMapLocationCoordinates,
    undefined
  );
  const [sessionToken, setSessionToken] = useState<string>("");
  const formRef = useRef(null);
  const router = useRouter();

  const handleListItemClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    const target = evt.currentTarget;

    if (target) {
      const selectedItem: ListItemData = {
        name: target.textContent,
        id: target.dataset["value"] || "",
      };

      setSelectedItem(selectedItem);
      submitForm(selectedItem);
    }
  };

  const handleSearchButtonClick = (
    suggestion: MapboxSuggestion | undefined
  ) => {
    if (suggestion) {
      const selectedItem: ListItemData = {
        name: suggestion.name,
        id: suggestion.mapbox_id,
      };
      setSelectedItem(selectedItem);
      submitForm(selectedItem);
    }
  };

  /**
   * Submit the form programmatically
   * @param {ListItemData} selectedItem the item selected
   */
  const submitForm = (selectedItem: ListItemData) => {
    if (formRef.current) {
      const typedFormRef = formRef.current as HTMLFormElement;
      const locationIdEl = typedFormRef.children.namedItem(
        "mapboxLocationId"
      ) as HTMLInputElement;
      locationIdEl.value = selectedItem.id;
      typedFormRef.requestSubmit();
    }
  };

  const listItemTemplateFn = (item: MapboxSuggestion) => {
    let listItemContent = item.name;

    if (item.name !== item.address && item.full_address) {
      listItemContent = `${listItemContent} ${item.full_address}`;
    }

    return (
      <li
        className="hover:bg-base-300 cursor-pointer px-3 py-1.5 h-9 overflow-hidden"
        key={item.mapbox_id}
        data-value={item.mapbox_id}
        onClick={handleListItemClick}
      >
        {listItemContent}
      </li>
    );
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          router.push(`/locations?lat=${latitude}&lon=${longitude}&userLocation=true`);
        },

        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    } 
  };

  const defaultListItems: React.JSX.Element[] = [
    <li
      className="hover:bg-base-300 rounded-lg cursor-pointer px-3 py-1.5 h-9 overflow-hidden"
      key="current-location"
      onClick={getUserLocation}
    >
      <FontAwesomeIcon icon={faLocationDot} /> Use Current Location
    </li>,
  ];

  const searchFn = useCallback(
    async (searchText: string): Promise<MapboxSuggestion[]> => {
      let results: MapboxSuggestion[] = [];
      if (searchText.trim() === "") {
        return [];
      }

      try {
        const data = await getLocationSuggestions(searchText);
        setSessionToken(data.sessionToken);
        results = data.suggestions;
      } catch (error) {
        console.error("Error fetching search results:", error);
      }

      return results;
    },
    []
  );

  return (
    <div className="w-full h-full relative">
      <Image
        src={background}
        alt="Background"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
        priority
      />
      <div className="hero h-64 px-16 xs:h-96 xl:w-6xl xl:mx-auto xl:px-0">
        <div className="w-full flex-col text-center md:text-start">
          <p
            className={twMerge(
              "flex justify-center text-white text-4xl font-extrabold",
              "xs:text-5xl",
              "md:text-6xl md:justify-start"
            )}
          >
            Locations. Places.
          </p>
          <p
            className={twMerge(
              "flex justify-center text-white text-4xl font-extrabold mb-4",
              "xs:text-5xl",
              "md:text-6xl md:justify-start"
            )}
          >
            Things to See.
          </p>
          <form
            action={action}
            ref={formRef}
            className="flex justify-center md:justify-start"
          >
            <Searchbox
              textboxClassName="input input-lg w-full bg-base-100 rounded-r-none text-ellipsis sm:w-96"
              listClassName="bg-base-100 rounded-lg shadow-md border border-gray-300 absolute w-[calc(100vw-128px)] text-start mt-2 sm:w-111.75"
              outerWrapperClassName="join justify-center w-full sm:w-96 md:justify-start"
              innerWrapperClassName="join-item w-full sm:w-96"
              buttonClassName="btn btn-lg btn-base-100 border-gray-300 join-item"
              buttonIcon={<FontAwesomeIcon icon={faSearch} />}
              debounceDelay={250}
              placeholderText="Enter an address, neighborhood, city, or ZIP code"
              defaultListItems={defaultListItems}
              listItemTemplateFn={listItemTemplateFn}
              onButtonClick={handleSearchButtonClick}
              searchFn={searchFn}
            />
            <input type="hidden" name="sessionToken" value={sessionToken} />
            <input
              type="hidden"
              name="mapboxLocationId"
              value={selectedItem?.id || ""}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
