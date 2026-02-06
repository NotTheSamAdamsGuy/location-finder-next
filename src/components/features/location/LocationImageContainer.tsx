import { JSX } from "react";
import Image from "next/image";
import { LocationImage } from "@notthesamadamsguy/location-finder-types";

import { getImageUrl } from "@/lib/utils/imageUtils";

interface Props {
  images: LocationImage[];
}

/**
 * A component for displaying images on the Location details page. In smaller
 * viewscreens, it presents itself as an image carousel. On larger screens, it
 * shows as a grid of 3 to 7 images.
 * @param param
 * @returns a JSX.Element object
 */
export default function LocationImageCarousel({ images }: Props) {
  const placeholderLocationImage = () => {
    return {
      filename: "placeholder.jpg",
      originalFilename: "placeholder.jpg",
      description: "Placeholder image",
    };
  };

  const advertisementImage = () => {
    return {
      filename: "placeholder.jpg",
      originalFilename: "placeholder.jpg",
      description: "Advertisement image",
    };
  };

  // add placeholder image if there aren't any location images
  if (images.length === 0) {
    images.push(placeholderLocationImage());
  }

  const imagesForGrid = [...images];

  // add advertisement images if there aren't enough location images to fill out the grid
  while (imagesForGrid.length < 7) {
    imagesForGrid.push(advertisementImage());
  }

  const carouselItems = images.slice().map((image, index) => {
    return (
      <div className="carousel-item w-full" key={`item${index + 1}`}>
        <Image
          src={
            image && image.filename !== "placeholder.jpg"
              ? getImageUrl(image)
              : "/placeholder.jpg"
          }
          alt={image?.description || "location image"}
          width={768}
          height={412}
          className="w-full h-72 object-cover object-center"
          priority
        />
      </div>
    );
  });

  const gridImage = (index: number) => {
    let className = "h-full object-cover object-center ";

    if (index === 0) {
      className += "rounded-l-2xl";
    } else if (index === 1) {
      className += "rounded-tr-2xl lg:rounded-none";
    } else if (index === 2) {
      className += "rounded-br-2xl lg:rounded-none";
    } else if (index === 3) {
      className += "rounded-tr-2xl xl:rounded-none";
    } else if (index === 4) {
      className += "rounded-br-2xl xl:rounded-none";
    } else if (index === 5) {
      className += "rounded-tr-2xl";
    } else if (index === 6) {
      className += "rounded-br-2xl";
    }

    return (
      <Image
        src={
          imagesForGrid[index].filename !== "placeholder.jpg"
            ? getImageUrl(imagesForGrid[index])
            : "/placeholder.jpg"
        }
        alt={imagesForGrid[index].description || "location image"}
        width={768}
        height={412}
        className={className}
        priority={index === 0}
      />
    );
  };

  const gridImages = () => {
    const gridImages: JSX.Element[] = [];

    for (let i = 0; i <= 6; i++) {
      let className = "h-full ";
      if (i === 0) {
        className = "row-span-2 col-span-3 lg:col-span-5";
      } else if (i === 1 || i === 2) {
        className += "col-span-2";
      } else if (i === 3 || i === 4) {
        className += "col-span-2 hidden lg:block";
      } else if (i > 4) {
        className += "col-span-2 hidden xl:block";
      }

      gridImages.push(
        <div className={className} key={`gridImage${i + 1}`}>
          {gridImage(i)}
        </div>,
      );
    }

    return gridImages;
  };

  return (
    <>
      <div className="carousel w-full md:hidden">{carouselItems}</div>
      <div className="hidden md:block w-full">
        <div className="grid grid-cols-5 grid-rows-2 gap-2 h-96 p-3 grid-flow-col lg:grid-cols-9 xl:grid-cols-11">
          {gridImages()}
        </div>
      </div>
    </>
  );
}
