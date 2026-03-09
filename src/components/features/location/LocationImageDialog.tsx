import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { LocationImage } from "@notthesamadamsguy/location-finder-types";
import Image from "next/image";

import Dialog from "@/components/ui/Dialog";

interface Props {
  showDialog: boolean;
  images: LocationImage[];
  scrollTo: number;
  onCloseButtonClick: () => void;
}

export default function LocationImageDialog({
  showDialog,
  images,
  scrollTo = 0,
  onCloseButtonClick,
}: Props) {
  const handleCloseClick = () => {
    onCloseButtonClick();
  };

  const dialogImages = images.map((image, index) => {
    return (
      <Image
        key={`location-${index}`}
        src={
          image && image.filename !== "placeholder.jpg"
            ? image.url!
            : "/placeholder.jpg"
        }
        alt={image?.description || "location image"}
        width={768}
        height={412}
        className="w-full h-72 object-cover object-center mb-2 md:w-2xl md:h-[396px] md:mx-auto"
      />
    );
  });

  return (
    <Dialog
      className="md:max-w-4xl md:max-h-dvh md:my-3 md:rounded-lg"
      showDialog={showDialog}
      id="location-images-dialog"
      closeButtonLocation="left"
      closeButtonIcon={faAngleLeft}
      closeButtonText="Return to location"
      scrollTo={scrollTo}
      onClose={handleCloseClick}
    >
      {dialogImages}
    </Dialog>
  );
}
