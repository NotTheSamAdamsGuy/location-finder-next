import { Feature, Point } from "geojson";
import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PopupImage from "./PopupImage";

type PopupProps = {
  map: mapboxgl.Map;
  activeFeature: LocationFeature | null;
};

export default function Popup({ map, activeFeature }: PopupProps) {
  // a ref to hold the popup instance
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  // a ref for an element to hold the popup's content
  const contentRef = useRef(document.createElement("div"));

  const fullAddress = `${activeFeature?.properties.address}, ${activeFeature?.properties.city}, ${activeFeature?.properties.state?.abbreviation} ${activeFeature?.properties.postalCode}`;

  // instantiate the popup on mount, remove it on unmount
  useEffect(() => {
    if (!map) return;

    // create a new popup instance, but do not set its location or content yet
    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 20,
    });

    return () => {
      popupRef.current!.remove();
    };
  }, [map]);

  // when activeFeature changes, set the popup's location and content, and add it to the map
  useEffect(() => {
    if (!activeFeature || !popupRef?.current) return;

    const af = activeFeature as Feature<Point>;

    popupRef.current
      .setLngLat(af.geometry.coordinates as [number, number]) // set its position using activeFeature's geometry
      .setHTML(contentRef.current.outerHTML) // use contentRef's `outerHTML` to set the content of the popup
      .addTo(map); // add the popup to the map
  }, [activeFeature, map]);

  // use a react portal to render the content to show in the popup, assigning it to contentRef
  return (
    <>
      {createPortal(
        <div className="portal-content card">
          <figure className="h-36 md:h-auto">
            <PopupImage feature={activeFeature} />
          </figure>
          <div className="card-body bg-base-100 rounded-b-lg">
            <h2 className="card-title">{activeFeature?.properties.name}</h2>
            <p>{fullAddress}</p>
          </div>
        </div>,
        contentRef.current
      )}
    </>
  );
}
