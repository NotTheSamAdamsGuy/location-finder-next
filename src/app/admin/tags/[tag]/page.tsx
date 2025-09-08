import { forbidden, notFound } from "next/navigation";

import TagForm from "@/app/admin/components/TagForm";
import PageHeader from "@/app/admin/components/PageHeader";
import { getTag, verifySession } from "@/app/lib/dal";
import Breadcrumbs from "@/app/components/Breadcrumbs";

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
