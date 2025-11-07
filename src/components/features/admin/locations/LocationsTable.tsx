"use client";

import { useState } from "react";
import {
  LocationFeature,
  LocationFeatureCollection,
} from "@notthesamadamsguy/location-finder-types";

import { TableData } from "@/types/tables.types";
import { deleteLocation } from "@/formActions/admin/locations";
import TableActionControls from "@/components/features/admin/TableActionControls";
import { ClientTable } from "@/components/ui/ClientTable";

export default function LocationsTable({
  data,
}: {
  data: LocationFeatureCollection;
}) {
  const [locs, setLocs] = useState<LocationFeature[]>(data.features);
  const tableData = mapLocationsToTableData(locs);

  const handleDeleteClick = async (locationId: string) => {
    // send request to delete location
    await deleteLocation(locationId);

    // clear removed location from state data
    const filteredLocs = [...locs].filter((loc) => loc.id !== locationId);
    setLocs(filteredLocs);
  };

  return <ClientTable data={tableData} paginated={true} itemsPerPage={10} />;

  function mapLocationsToTableData(locs: LocationFeature[]): TableData {
    const headers = ["Name", "Actions"];

    const values = locs.map((loc, index) => {
      return [
        loc.properties.name,
        <TableActionControls
          key={"ac-" + index}
          itemId={loc.id}
          itemName={loc.properties.name}
          editLinkUrl="/admin/locations"
          onDeleteClick={() => handleDeleteClick(loc.id)}
        />,
      ];
    });

    return { headers: headers, values: values };
  }
}
