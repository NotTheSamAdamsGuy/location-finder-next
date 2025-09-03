import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="px-3">
      <div className="card bg-primary text-primary-content my-3">
        <div className="card-body">
          <h2 className="card-title">Locations</h2>
          <p>
            Add, edit, or remove location data
          </p>
          <div className="card-actions justify-center mt-2">
            <Link href="/admin/locations" className="btn">Manage Locations</Link>
          </div>
        </div>
      </div>
      <div className="card bg-secondary text-primary-content my-3">
        <div className="card-body">
          <h2 className="card-title">Users</h2>
          <p>
            Add, edit, or remove users
          </p>
          <div className="card-actions justify-center mt-2">
            <Link href="/admin/users" className="btn">Manage Users</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
