"use client";

import { useState } from "react";

import { TableData } from "@/types/tables.types";
import { deleteTag } from "@/formActions/admin/tags";
import { ClientTable } from "@/components/ui/ClientTable";
import TableActionControls from "@/components/features/admin//TableActionControls";

export default function TagsTable({ data }: { data: string[] }) {
  const [tags, setTags] = useState<string[]>(data);
  const tableData = mapTagsToTableData(tags);

  const handleDeleteClick = async (tagToDelete: string) => {
    // send request to delete tag
    await deleteTag(tagToDelete);

    // clear removed tag from state data
    const filteredTags = [...tags].filter((tag) => tag !== tagToDelete);
    setTags(filteredTags);
  };

  return <ClientTable data={tableData} paginated={true} itemsPerPage={10} />;

  function mapTagsToTableData(tags: string[]): TableData {
    const headers = ["Tag", "Actions"];

    const values = tags.map((tag, index) => {
      return [
        tag,
        <TableActionControls
          key={"ac-" + index}
          itemId={tag}
          editLinkUrl="/admin/tags"
          onDeleteClick={() => handleDeleteClick(tag)}
        />,
      ];
    });

    return { headers: headers, values: values };
  }
}
