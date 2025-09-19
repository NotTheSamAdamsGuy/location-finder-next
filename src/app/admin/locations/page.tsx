import Link from "next/link";
import { forbidden } from "next/navigation";

import LocationsTable from "../components/LocationsTable";
import { verifySession } from "@/app/lib/session";
import { getAllLocations } from "@/app/data/locations";
import Breadcrumbs from "@/app/components/Breadcrumbs";

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
