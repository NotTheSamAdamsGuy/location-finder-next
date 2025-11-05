import Link from "next/link";
import { forbidden } from "next/navigation";

import { verifySession } from "@/lib/session";
import PageHeader from "@/components/features/admin/PageHeader";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";

export default async function AdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Admin" />
        <div className="card bg-primary text-primary-content my-3">
          <div className="card-body">
            <h2 className="card-title">Locations</h2>
            <p>Add, edit, or remove location data</p>
            <div className="card-actions justify-center mt-2">
              <Link href="/admin/locations" className="btn">
                Manage Locations
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-secondary text-primary-content my-3">
          <div className="card-body">
            <h2 className="card-title">Users</h2>
            <p>Add, edit, or remove users</p>
            <div className="card-actions justify-center mt-2">
              <Link href="/admin/users" className="btn">
                Manage Users
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-accent text-primary-content my-3">
          <div className="card-body">
            <h2 className="card-title">Tags</h2>
            <p>Add, edit, or remove tags</p>
            <div className="card-actions justify-center mt-2">
              <Link href="/admin/tags" className="btn">
                Manage Tags
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
