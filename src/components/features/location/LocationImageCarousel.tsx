import Image from "next/image";
import { LocationImage } from "@notthesamadamsguy/location-finder-types";

import { getImageUrl } from "@/lib/utils/imageUtils";

interface Props {
  images: LocationImage[];
}
export default function LocationImageCarousel({ images }: Props) {
  // add placeholder image if there aren't any location images
  if (images.length === 0) {
    images.push({
      filename: "placeholder.jpg",
      originalFilename: "placeholder.jpg",
      description: "Placeholder image"
    });
  }

  const carouselItems = images.map((image, index) => {
    return (
      <div className="carousel-item w-full" key={`item${index + 1}`}>
        <Image
          src={image.filename !== "placeholder.jpg" ? getImageUrl(image) : "/placeholder.jpg"}
          alt={image.description || "location image"}
          width={768}
          height={412}
          className="w-full h-72 object-cover object-center"
          priority
        />
      </div>
    );
  });

  return (
    <div className="carousel w-full">
      {carouselItems}
    </div>
  );
}
