import Link from "next/link";
import { forbidden } from "next/navigation";

import { verifySession } from "@/lib/session";
import { getAllTags } from "@/lib/api/tags";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import TagsTable from "@/components/features/admin/tags/TagsTable";

export default async function TagsAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  const tags: string[] = await getAllTags();

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
          <TagsTable data={tags} />
        </div>
      </div>
    </div>
  );
}
