import { forbidden } from "next/navigation";

import { verifySession } from "@/lib/session";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import PageHeader from "@/components/features/admin/PageHeader";
import AddUserForm from "@/components/features/admin/users/AddUserForm";

export default async function AddUserAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Add a User" />
        <div className="my-3">
          <AddUserForm />
        </div>
      </div>
    </div>
  );
}