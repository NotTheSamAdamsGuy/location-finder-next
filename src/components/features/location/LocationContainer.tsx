"use client";

import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import { useRef } from "react";

import { useIntersection } from "@/hooks/useIntersection";

import LocationImageContainer from "./LocationImageContainer";
import MobileNavBar from "./MobileNavBar";
import TagsContainer from "./TagsContainer";

interface Props {
  location: LocationFeature;
}

export default function LocationContainer({ location }: Props) {
  const { name, address, city, state, postalCode, description } =
    location.properties;

  const locationImagesRef = useRef(null);
  const locationImagesAreVisible = useIntersection(locationImagesRef, 0.25);

  return (
    <div className="relative md:flex md:flex-col md:justify-center md:items-center">
      <MobileNavBar
        className={`w-full h-0 ${locationImagesAreVisible ? "" : "bg-base-100 h-18 shadow-sm"}`}
      />
      <div
        ref={locationImagesRef}
        className={`${locationImagesAreVisible ? "mt-0" : "-mt-18"}`}
      >
        <LocationImageContainer images={location.properties.images || []} />
      </div>
      <div className="md:w-3xl lg:w-4xl xl:w-6xl">
        <div className="p-3">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div>
            {address}, {city}, {state?.abbreviation} {postalCode}
          </div>
        </div>
        <div className="p-3">
          <h2 className="text-xl font-bold mb-3">About this location</h2>
          <TagsContainer location={location} className="mb-3" />
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
}
