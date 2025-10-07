"use client";

import { useRef, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @typedef {Object} FileUploaderProps
 * @property {string} props.inputName The name to assign to the File input.
 * @property {File[]} props.formStateFiles Any files that were included on a form submission that failed server-side validation.
 * @property {string[]} props.formStateDescriptions Any descriptions that were included on a form submission that failed server-side validation.
 * @property {boolean} props.multiple Whether the File input should accept multiple files (true) or not (false).
 */
type FileUploaderProps = {
  inputName: string;
  formStateFiles?: File[];
  formStateDescriptions?: string[];
  multiple: boolean;
  items?: FileUploaderItem[];
  buttonLabel?: string;
};

/**
 * @typedef {Object} FileUploaderItem
 * @property {string} displayName The name the file had when it was uploaded.
 * @property {string} fileName The current name of the file.
 * @property {string} description A description of the file.
 */
export type FileUploaderItem = {
  displayName: string;
  fileName: string;
  description: string;
};

/**
 * A component that allows users to add or remove files to a form, including a list of the files selected and their descriptions.
 * @param {FileUploaderProps} props The component's props
 * @returns {JSX.Element}
 */
export default function FileUploader({
  inputName,
  formStateFiles,
  multiple = false,
  items = [],
  buttonLabel = "Click here to add files",
}: FileUploaderProps) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState<File[] | undefined>(formStateFiles);
  const [listItems, setListItems] = useState<FileUploaderItem[]>(items);

  const fileCardInputs = listItems.map((item) => {
    return {
      fileName: item.fileName,
      displayName: item.displayName,
      description: item.description,
    };
  });

  /**
   * Add one or more files to state and update the files in the File input's FileList
   * @param evt ChangeEvent triggered by the File input
   */
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = evt.currentTarget;
    const fileList = fileInput.files;
    const dataTransfer = new DataTransfer();
    const tempFiles = files ? [...files] : [];
    const tempListItems = [...listItems];

    if (fileList) {
      for (const file of fileList) {
        dataTransfer.items.add(file);
        tempFiles.push(file);

        tempListItems.push({
          fileName: file.name,
          displayName: file.name,
          description: "",
        });
      }
      fileInput.files = dataTransfer.files;
      // figure out if this needs to be outside the if block
      setFiles(tempFiles);
      setListItems(tempListItems);
    }
  };

  /**
   * Remove the file from state and the File input's FileList
   * @param evt MouseEvent triggered by clicking the 'X' button on a card
   */
  const removeFile = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const nameOfFileToRemove = evt.currentTarget.dataset["filename"];
    let tempFiles: File[] = [];
    let tempListItems: FileUploaderItem[] = [];

    if (nameOfFileToRemove) {
      // If a file has been selected but not yet uploaded, we want to remove it from the array of files so that
      // it doesn't get uploaded when the form is submitted.
      if (files) {
        tempFiles = files.filter((file) => file.name !== nameOfFileToRemove);

        const dataTransfer = new DataTransfer();
        tempFiles.forEach((file) => dataTransfer.items.add(file));

        if (fileInputRef.current) {
          const fileInput = fileInputRef.current as HTMLInputElement;
          fileInput.files = dataTransfer.files;
          setFiles(tempFiles);
        }
      }

      // Now we can remove the list item from the UI so that the form fields are not uploaded
      tempListItems = listItems.filter(
        (item) => item.fileName !== nameOfFileToRemove
      );
      setListItems(tempListItems);
    }
  };

  /**
   * Trigger the click event of the hidden File input
   */
  const handleAddFileClick = () => {
    if (fileInputRef.current) {
      const fileInput = fileInputRef.current as HTMLInputElement;
      fileInput.click();
    }
  };

  return (
    <div data-testid="FileUploader">
      <button
        type="button"
        className="btn btn-secondary w-full mb-3"
        onClick={handleAddFileClick}
      >
        {buttonLabel}
      </button>
      <input
        type="file"
        name={inputName}
        id={inputName}
        multiple={multiple}
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
      />
      <FileCardList items={fileCardInputs} onRemoveFileCard={removeFile} />
    </div>
  );
}

//-------------------------------------------------------
// FileCardList
//-------------------------------------------------------

/**
 * @typedef {Object} FileCardListItem
 * @property {File} file - A file to upload.
 * @property {string} description - An optional description of the file.
 */
type FileCardListItem = {
  fileName: string;
  displayName: string;
  description?: string;
};

/**
 * @typedef {Object} FileCardListProps
 * @property {FileCardListItem[]} items - An array of FileCardListItem objects
 * @property {function(React.MouseEvent<HTMLButtonElement>)} onRemoveFileCard: Callback function called after a file card has been removed from the list
 */
type FileCardListProps = {
  items: FileCardListItem[];
  onRemoveFileCard: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * A component containing a collection of FileCard components.
 * @param {FileCardListProps} - The component's props.
 * @returns {JSX.Element}
 */
function FileCardList({ items, onRemoveFileCard }: FileCardListProps) {
  const fileCards = items.map(
    ({ fileName, displayName, description }, index) => {
      return (
        <FileCard
          key={`file-card-${index - 1}`}
          fileName={fileName}
          displayName={displayName}
          description={description}
          onRemoveClick={onRemoveFileCard}
        />
      );
    }
  );

  return (
    <div className="flex flex-col gap-y-3 p-3 border border-gray-200 rounded bg-[repeating-linear-gradient(45deg,_#e1e1e1_0,_#e1e1e1_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]">
      {fileCards.length > 0 ? (
        fileCards
      ) : (
        <span className="text-sm flex justify-center">
          No images selected for upload
        </span>
      )}
    </div>
  );
}

//-------------------------------------------------------
// FileCard
//-------------------------------------------------------

/**
 * @typedef {Object} FileCardProps
 * @property {fileName} fileName - The name of the file.
 * @property {displayName} displayName - The display name for the file.
 * @property {string} description - An optional description for the file.
 * @property {function (React.MouseEvent<HTMLButtonElement>)} - Callback called when the 'X' button is clicked.
 */
type FileCardProps = {
  fileName: string;
  displayName: string;
  description?: string;
  onRemoveClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * A card component containing file information.
 * @param {FileCardProps} props - The component's props.
 * @returns {JSX.Element}
 */
function FileCard({
  fileName,
  displayName,
  description = "",
  onRemoveClick,
}: FileCardProps) {
  const handleRemoveClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    onRemoveClick(evt);
  };

  return (
    <div className="card w-full bg-base-100 card-xs border border-gray-300 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{displayName}</h2>
        <div className="absolute top-2 right-2">
          <button
            type="button"
            onClick={handleRemoveClick}
            data-filename={fileName}
            className="cursor-pointer"
            title={`Remove ${displayName}`}
          >
            <FontAwesomeIcon className="fa-lg" icon={faXmark} />
          </button>
        </div>
        <div>
          <label className="label text-sm">Description</label>
          <input
            type="text"
            className="input input-sm w-full"
            name="imageDescription"
            defaultValue={description}
          />
          <input type="hidden" name="filename" defaultValue={fileName} />
          <input
            type="hidden"
            name="originalFilename"
            defaultValue={displayName}
          />
        </div>
      </div>
    </div>
  );
}
