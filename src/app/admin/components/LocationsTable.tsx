"use client";

import { useState } from "react";

import { ClientTable } from "@/app/components/tables/ClientTable";
import { TableData, Location } from "@/app/lib/definitions";
// import { deleteLocation } from "@/app/actions/locations";
import ActionControls from "./ActionControls";

export default function LocationsTable({ data }: { data: Location[] }) {
  const [locs, setLocs] = useState<Location[]>(data);
  const tableData = mapLocationsToTableData(locs);

  const handleDeleteClick = async (locationId: string) => {
    // send request to delete location
    // await deleteLocation(location.id);

    // clear removed location from state data
    const filteredLocs = [...locs].filter((loc) => loc.id !== locationId);
    setLocs(filteredLocs);
  };

  return <ClientTable data={tableData} paginated={true} itemsPerPage={10} />;

  function mapLocationsToTableData(locs: Location[]): TableData {
    const headers = ["Name", "Actions"];

    const values = locs.map((loc, index) => {
      return [
        loc.name,
        <ActionControls
          key={"ac-" + index}
          itemId={loc.id}
          itemName={loc.name}
          editLinkUrl="/admin/locations"
          onDeleteClick={() => handleDeleteClick(loc.id)}
        />,
      ];
    });

    return { headers: headers, values: values };
  }
}
