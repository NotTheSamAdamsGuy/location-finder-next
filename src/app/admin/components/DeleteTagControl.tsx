"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteTagControl({
  tagToDelete,
  onClick,
}: {
  tagToDelete: string;
  onClick: (tag: string) => void;
}) {
  const handleClick = (tagToDelete: string) => {
    // prompt user to verify they really want to delete the tag
    const confirmation = confirm(
      `Are you sure you want to delete "${tagToDelete}"?`
    );

    if (confirmation) {
      onClick(tagToDelete);
    }
  };

  return (
    <FontAwesomeIcon
      icon={faTrash}
      width="0.75rem"
      className="cursor-pointer"
      onClick={() => handleClick(tagToDelete)}
    />
  );
}
