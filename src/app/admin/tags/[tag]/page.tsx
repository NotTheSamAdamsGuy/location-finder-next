import { forbidden, notFound } from "next/navigation";

import { verifySession } from "@/lib/session";
import { getTag } from "@/lib/api/tags";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import PageHeader from "@/components/features/admin/PageHeader";
import TagForm from "@/components/features/admin/tags/TagForm";

export default async function UpdateTagAdminPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const session = await verifySession();
  const { tag } = await params;

  if (session.role !== "ADMIN") {
    forbidden();
  }

  // check if the tag exists in the database; return a 404 if it does not
  const tagValue = await getTag(tag);

  if (!tagValue) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Edit Tag" />
        <div className="my-3">
          <TagForm tag={tag} type="update" />
        </div>
      </div>
    </div>
  );
}
