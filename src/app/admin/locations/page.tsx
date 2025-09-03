import Link from "next/link";

export default function LocationsAdminPage() {
  return (
    <div className="px-3 py-1.5">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link href="/admin">Admin</Link></li>
          <li>Locations</li>
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-2xl border-0 border-black border-b-2">Manage Locations</h1>
        <div className="my-3">
          <Link className="btn w-full" href="/admin/locations/add">Add a Location</Link>
        </div>
      </div>
    </div>
  );
}