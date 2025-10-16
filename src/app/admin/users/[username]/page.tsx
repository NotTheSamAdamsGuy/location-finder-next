import { forbidden } from "next/navigation";

import PageHeader from "@/app/admin/components/PageHeader";
import { verifySession } from "@/app/lib/session";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getUserProfile } from "@/app/data/users";
import UpdateUserForm from "@/app/admin/components/UpdateUserForm";

export default async function UpdateUserAdminPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  const { username } = await params;
  const user = await getUserProfile(username);

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Edit User" />
        <div className="my-3">
          <UpdateUserForm user={user} />
        </div>
      </div>
    </div>
  );
}