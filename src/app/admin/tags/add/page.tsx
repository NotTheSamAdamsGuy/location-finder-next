import { forbidden } from "next/navigation";

import TagForm from "@/app/admin/tags/components/TagForm";
import PageHeader from "@/app/admin/components/PageHeader";
import { verifySession } from "@/app/lib/session";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default async function AddTagAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Add a Tag" />
        <div className="my-3">
          <TagForm type="add" />
        </div>
      </div>
    </div>
  );
}