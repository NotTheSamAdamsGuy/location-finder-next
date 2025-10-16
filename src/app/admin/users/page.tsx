import Link from "next/link";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import UsersTable from "@/app/admin/users/components/UsersTable";
import { getAllUsernames } from "@/app/data/users";
import { verifySession } from "@/app/lib/session";
import { forbidden } from "next/navigation";

export default async function UsersAdminPage() {
  const session = await verifySession();
  
  if (session.role !== "ADMIN") {
    forbidden();
  }

  const users = await getAllUsernames();

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <h1 className="font-bold text-2xl border-0 border-black border-b-2">
          Manage Users
        </h1>
        <div className="my-3">
          <Link className="btn btn-primary w-full" href="/admin/users/add">
            Add a User
          </Link>
          <UsersTable data={users} />
        </div>
      </div>
    </div>
  );
}