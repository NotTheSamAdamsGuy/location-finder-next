"use client";

import DOMPurify from "dompurify";
import { getImageUrl } from "@/lib/utils/imageUtils";
import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import Image from "next/image";
import MobileNavBar from "./MobileNavBar";
import { useRef } from "react";
import { useIntersection } from "@/hooks/useIntersection";

interface Props {
  location: LocationFeature;
}

export default function LocationContainer({ location }: Props) {
  const { name, address, city, state, postalCode, description } =
    location.properties;
  // the sanitize stuff is throwing errors - need to figure out why or find another approach
  // const safeDescription = DOMPurify.sanitize(description as string, { USE_PROFILES: { html: true } });
  const locationImages: React.ReactNode[] = location?.properties?.images
    ? location.properties.images.map((imageData) =>   {
        const imageUrl = getImageUrl(imageData);
        const imageAlt = imageData.description ?? "location image";
        return (
          <Image
            key={imageAlt}
            src={imageUrl}
            alt={imageAlt}
            width={768}
            height={412}
            className="w-full h-72 object-cover object-center"
            priority
          />
        );
      })
    : [];

  const locationImagesRef = useRef(null);
  const locationImagesAreVisible = useIntersection(locationImagesRef, 0.25);

  return (
    <div className="relative">
      <MobileNavBar
        className={`w-full h-0 ${locationImagesAreVisible ? "" : "bg-base-100 h-18 shadow-sm"}`}
      />
      <div ref={locationImagesRef} className={`${locationImagesAreVisible ? "mt-0" : "-mt-18"}`}>{locationImages[0]}</div>
      <div className="p-3">
        <h1 className="text-3xl font-bold">{name}</h1>
        <div>
          {address}, {city}, {state?.abbreviation} {postalCode}
        </div>
      </div>
      <div className="p-3">
        <h2 className="text-xl font-bold">About this location</h2>
        {/* <div dangerouslySetInnerHTML={{ __html: safeDescription }} /> */}
        <div>{description}</div>
      </div>
    </div>
  );
}
