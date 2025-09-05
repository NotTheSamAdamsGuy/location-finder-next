import Link from "next/link";
import { forbidden } from "next/navigation";

import { Location, TableData } from "@/app/lib/definitions";
import { BasicTable } from "@/app/components/tables/BasicTable";
import { getAllLocations, verifySession } from "@/app/lib/dal";
import Breadcrumbs from "../../components/Breadcrumbs";

export default async function LocationsAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  // TODO: replace the BasicTable with a better component
  const locations: Location[] = await getAllLocations();

  const mapLocationsToTableData = (locs: Location[]): TableData => {
    const headers = ["Name", "Description"];
    const values = locs.map((location) => {
      return [location.name, location.description];
    });

    return { headers: headers, values: values };
  };

  const tableData: TableData = mapLocationsToTableData(locations);

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <h1 className="font-bold text-2xl border-0 border-black border-b-2">
          Manage Locations
        </h1>
        <div className="my-3">
          <Link className="btn w-full" href="/admin/locations/add">
            Add a Location
          </Link>
          <BasicTable data={tableData} />
        </div>
      </div>
    </div>
  );
}
