import { forbidden } from "next/navigation";

import PageHeader from "@/app/admin/components/PageHeader";
import { verifySession } from "@/app/lib/session";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AddUserForm from "@/app/admin/users/components/AddUserForm";

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