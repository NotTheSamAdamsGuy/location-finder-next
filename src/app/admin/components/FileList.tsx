import { FileCard } from "@/app/lib/definitions";

export default function FileList({ fileCards }: { fileCards: FileCard[]}) {
  const fileListItems: React.ReactNode[] = fileCards?.map(({file, description}, index) => {
    return <FileListItem key={`file-card-${index}`} file={file} description={description || ""} />
  });

  return (
    <div className="flex flex-col gap-y-3 p-3 border border-gray-200 rounded bg-[repeating-linear-gradient(45deg,_#e1e1e1_0,_#e1e1e1_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]">
      {fileListItems.length > 0 ? fileListItems : <span className="text-sm flex justify-center">No images selected for upload</span>}
    </div>
  );
}

export function FileListItem({file, description}: {file: File, description: string}) {
  return (
    <div className="card w-full bg-base-100 card-xs border border-gray-300 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{file.name}</h2>
        <div>
          <label className="label text-sm">Description</label>
          <input
            type="text"
            className="input input-sm w-full"
            name="imageDescription"
          />
        </div>
      </div>
    </div>
  );
}
