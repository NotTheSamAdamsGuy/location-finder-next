import { forbidden } from "next/navigation";

import PageHeader from "../../components/PageHeader";
import { verifySession } from "@/app/lib/session";
import Breadcrumbs from "../../../components/Breadcrumbs";
import UserForm from "../../components/UserForm";

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
          <UserForm type="add" />
        </div>
      </div>
    </div>
  );
}