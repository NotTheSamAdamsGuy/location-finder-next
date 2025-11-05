import { forbidden } from "next/navigation";

import { verifySession } from "@/lib/session";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import PageHeader from "@/components/features/admin/PageHeader";
import TagForm from "@/components/features/admin/tags/TagForm";

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