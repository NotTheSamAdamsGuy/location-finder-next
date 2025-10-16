"use client";

import { useState } from "react";

import { ClientTable } from "@/app/components/tables/ClientTable";
import { TableData } from "@/app/lib/definitions";
import { deleteUser } from "@/app/admin/users/formActions";
import ActionControls from "@/app/admin/components/TableActionControls";

export default function UsersTable({ data }: { data: string[] }) {
  const [usernames, setUsernames] = useState<string[]>(data);
  const tableData = mapUsernamesToTableData(usernames);

  const handleDeleteClick = async (username: string) => {
    // send request to delete user
    await deleteUser(username);

    // clear removed user from state data
    const filteredUsernames = [...usernames].filter((name) => name !== username);
    setUsernames(filteredUsernames);
  };

  return <ClientTable data={tableData} paginated={true} itemsPerPage={10} />;

  function mapUsernamesToTableData(usernames: string[]): TableData {
    const headers = ["Name", "Actions"];
    const values: Array<Array<React.ReactNode>> = [];

    usernames.forEach((username, index) => {
      values.push([
        username,
        <ActionControls
          key={"ac-" + index}
          itemId={username}
          itemName={username}
          editLinkUrl="/admin/users"
          onDeleteClick={() => handleDeleteClick(username)}
        />
      ]);
    });

    return { headers: headers, values: values };
  }
}