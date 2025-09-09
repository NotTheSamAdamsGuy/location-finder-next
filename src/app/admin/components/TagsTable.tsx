"use client"

import Link from "next/link";
import { useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ClientTable } from "@/app/components/tables/ClientTable";
import { TableData } from "@/app/lib/definitions";
import DeleteTagControl from "./DeleteTagControl";
import { deleteTag } from "@/app/actions/tags";

export default function TagsTable({ data }: { data: string[] }) {
  const [tags, setTags] = useState<string[]>(data);
  const tableData = mapTagsToTableData(tags);

  const handleDeleteClick = async (tagToDelete: string) => {
    // send request to delete tag
    await deleteTag(tagToDelete);
    
    // clear removed tag from state data
    const filteredTags = [...tags].filter((tag) => tag !== tagToDelete);
    setTags(filteredTags)
  };

  return <ClientTable data={tableData} />;

  function mapTagsToTableData(tags: string[]): TableData {
    const headers = ["Tag", "Actions"];

    const values = tags.map((tag, index) => {
      return [
        tag,
        <div key={index} className="flex">
          <div>
            <Link href={`/admin/tags/${tag}`} title="Edit">
              <FontAwesomeIcon icon={faPenToSquare} width="0.75rem" />
            </Link>
          </div>
          <div title="Delete">
            <DeleteTagControl tagToDelete={tag} onClick={() => handleDeleteClick(tag)} />
          </div>
        </div>,
      ];
    });

    return { headers: headers, values: values };
  }
}
