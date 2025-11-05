import { forbidden } from "next/navigation";

import { getUserProfile } from "@/lib/api/users";
import { verifySession } from "@/lib/session";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import PageHeader from "@/components/features/admin/PageHeader";
import UpdateUserForm from "@/components/features/admin/users/UpdateUserForm";

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