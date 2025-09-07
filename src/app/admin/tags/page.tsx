import Link from "next/link";
import { forbidden } from "next/navigation";

import { TableData } from "@/app/lib/definitions";
import { BasicTable } from "@/app/components/tables/BasicTable";
import { getAllTags, verifySession } from "@/app/lib/dal";
import Breadcrumbs from "../../components/Breadcrumbs";

export default async function TagsAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  // TODO: replace the BasicTable with a better component
  const tags: string[] = await getAllTags();

  const mapTagsToTableData = (tags: string[]): TableData => {
    const headers = ["Tag"];
    const values = tags.map((tag) => {
      return [tag];
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
          <BasicTable data={tableData} />
        </div>
      </div>
    </div>
  );
}
