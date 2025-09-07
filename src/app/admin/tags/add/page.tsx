import { forbidden } from "next/navigation";

import AddTagForm from "@/app/admin/components/AddTagForm";
import PageHeader from "../../components/PageHeader";
import { verifySession } from "@/app/lib/dal";
import Breadcrumbs from "../../../components/Breadcrumbs";

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
          <AddTagForm />
        </div>
      </div>
    </div>
  );
}