import Link from "next/link";
import { forbidden } from "next/navigation";
;
import { verifySession } from "@/lib/session";
import { getAllLocations } from "@/lib/api/locations";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import LocationsTable from "@/components/features/admin/locations/LocationsTable"

export default async function LocationsAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  const locations = await getAllLocations();

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <h1 className="font-bold text-2xl border-0 border-black border-b-2">
          Manage Locations
        </h1>
        <div className="my-3">
          <Link className="btn btn-primary w-full" href="/admin/locations/add">
            Add a Location
          </Link>
          <LocationsTable data={locations} />
        </div>
      </div>
    </div>
  );
}
