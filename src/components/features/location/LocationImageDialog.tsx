import Image from "next/image";
import Dialog from "@/components/ui/Dialog";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { LocationImage } from "@notthesamadamsguy/location-finder-types";
import { getImageUrl } from "@/lib/utils/imageUtils";

interface Props {
  showDialog: boolean;
  images: LocationImage[]
  onCloseButtonClick: () => void;
}

export default function LocationImageDialog({
  showDialog,
  images,
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
            ? getImageUrl(image)
            : "/placeholder.jpg"
        }
        alt={image?.description || "location image"}
        width={768}
        height={412}
        className="w-full h-72 object-cover object-center mb-2"
      />
    )
  });

  return (
    <Dialog
      showDialog={showDialog}
      closeButtonLocation="left"
      closeButtonIcon={faAngleLeft}
      closeButtonText="Return to location"
      onCloseClick={handleCloseClick}
    >
      {dialogImages}
    </Dialog>
  );
}
