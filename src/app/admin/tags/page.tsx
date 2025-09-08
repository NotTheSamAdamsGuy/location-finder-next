import Link from "next/link";
import { forbidden } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { TableData } from "@/app/lib/definitions";
import { ClientTable } from "@/app/components/tables/ClientTable";
import { getAllTags, verifySession } from "@/app/lib/dal";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default async function TagsAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  // TODO: replace the BasicTable with a better component
  const tags: string[] = await getAllTags();

  const mapTagsToTableData = (tags: string[]): TableData => {
    const headers = ["Tag", "Actions"];
    
    const values = tags.map((tag, index) => {
      return [
        tag,
        <div key={index} className="flex">
          <div>
            <Link href={`/admin/tags/${tag}`} title="Edit">
              <FontAwesomeIcon icon={faPenToSquare} width="0.75rem" />
            </Link>
          </div>
          <div title="Delete">
            <FontAwesomeIcon icon={faTrash} width="0.75rem" />
          </div>
        </div>,
      ];
    });

    return { headers: headers, values: values };
  };

  const tableData: TableData = mapTagsToTableData(tags);

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <h1 className="font-bold text-2xl border-0 border-black border-b-2">
          Manage Tags
        </h1>
        <div className="my-3">
          <Link className="btn btn-primary w-full" href="/admin/tags/add">
            Add a Tag
          </Link>
          <ClientTable data={tableData} />
        </div>
      </div>
    </div>
  );
}
