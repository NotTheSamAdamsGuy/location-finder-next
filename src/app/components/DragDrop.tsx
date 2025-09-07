import { FileUploader } from "react-drag-drop-files";

import { FileCard, ImageFileTypes } from "../lib/definitions";

function DragDrop({
  onFilesSelected,
}: {
  fileCards: FileCard[];
  onFilesSelected: (files: File | File[]) => void;
}) {
  const handleSelected = (files: File | File[]) => {
    onFilesSelected(files);
  };

  return (
    <div className="mb-3">
      <FileUploader
        multiple={true}
        onSelect={handleSelected}
        name="images"
        types={ImageFileTypes}
      />
    </div>
  );
}

export default DragDrop;
