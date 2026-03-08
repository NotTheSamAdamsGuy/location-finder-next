import { faXmark, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  showDialog: boolean;
  id: string;
  closeButtonLocation?: string;
  closeButtonIcon?: IconDefinition;
  closeButtonText?: string;
  children: React.ReactNode;
  className?: string;
  scrollTo?: number;
  onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Dialog({
  showDialog,
  id = "replace-me",
  closeButtonLocation = "right",
  closeButtonIcon = faXmark,
  closeButtonText = "",
  children,
  className,
  scrollTo,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  /**
   * Connect the <dialog> element's close() and showDialog() methods to the showDialog state variable.
   */
  useEffect(() => {
    if (dialogRef.current?.open && !showDialog) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && showDialog) {
      dialogRef.current?.showModal();
      
      // scroll to the provided height
      if (scrollTo !== undefined) {
        dialogRef.current?.scrollTo({ top: scrollTo });
      }
    }
  }, [showDialog, scrollTo]);

  /**
   * Connect the escape keypress event to the close dialog handler
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const closeDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose(event);
  };

  return (
    <dialog
      id={id}
      className={twMerge(
        "fixed inset-0 size-auto max-h-none max-w-none m-auto",
        "overflow-y-auto open:animate-fade-in open:backdrop:animate-dialog-fade-in",
        "backdrop:bg-gray-400 backdrop:opacity-60 bg-base-100 shadow-md shadow-gray-400",
        "dark:backdrop:bg-gray-700 dark:backdrop:opacity-70 dark:bg-gray-600 dark:shadow-gray-900",
        className,
      )}
      ref={dialogRef}
    >
      <div className={`flex h-16 sticky top-0 bg-base-100`}>
        <button
          className={twMerge(
            "flex items-center px-3 cursor-pointer",
            closeButtonLocation === "left"
              ? "left-3"
              : "right-3 flex-row-reverse",
          )}
          onClick={closeDialog}
        >
          <FontAwesomeIcon icon={closeButtonIcon} className="text-xl" />
          <span>{closeButtonText}</span>
        </button>
      </div>
      <div className="">{children}</div>
    </dialog>
  );
}
