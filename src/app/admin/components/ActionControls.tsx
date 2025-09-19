import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type ActionControlProps = {
  itemId: string;
  itemName?: string;
  editLinkUrl: string;
  onDeleteClick: (itemId: string) => void;
}

export default function ActionControls({itemId, itemName, editLinkUrl, onDeleteClick}: ActionControlProps) {
  const handleDeleteClick = (itemId: string, itemName?: string) => {
    // prompt user to verify they really want to delete the item
    const confirmation = confirm(
      `Are you sure you want to delete "${itemName || itemId}"?`
    );

    if (confirmation) {
      onDeleteClick(itemId);
    }
  };

  return (
    <div className="flex">
      <div>
        <Link href={`${editLinkUrl}/${itemId}`} title="Edit">
          <FontAwesomeIcon icon={faPenToSquare} width="0.75rem" />
        </Link>
      </div>
      <div title="Delete">
        <FontAwesomeIcon
          icon={faTrash}
          width="0.75rem"
          className="cursor-pointer"
          onClick={() => handleDeleteClick(itemId, itemName)}
        />
      </div>
    </div>
  );
}