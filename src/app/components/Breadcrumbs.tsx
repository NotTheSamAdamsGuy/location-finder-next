import Link from "next/link";
import { headers } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export type BreadcrumbData = {
  text: React.ReactNode;
  link: string;
};

export default async function Breadcrumbs({
  type,
  className="text-sm bg-gray-100 px-3 border-0 border-gray-300 border-b border-t"
}: {
  type: "admin" | "site",
  className?: string
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const breadcrumbsPaths = pathname?.split("/");
  const breadcrumbItems: React.ReactNode[] = [];
  const mappingFunction = type === "admin" ? adminBreadcrumbMapper : siteBreadcrumbMapper

  breadcrumbsPaths?.forEach((path, index) => {
    const { text, link } = mappingFunction(path);
    const breadcrumbContent =
      index === breadcrumbsPaths.length - 1 ? (
        text
      ) : (
        <Link href={link}>{text}</Link>
      );
    const breadcrumbItem = <li key={`bc-${index}`}>{breadcrumbContent}</li>;

    breadcrumbItems.push(breadcrumbItem);
  });

  return (
    <div className={`breadcrumbs ${className}`}>
      <ul>{breadcrumbItems}</ul>
    </div>
  );
}

const adminBreadcrumbMapper = (path: string): BreadcrumbData => {
  switch (path) {
    case "":
      return {
        text: <FontAwesomeIcon icon={faHouse} width="15px" />,
        link: "/",
      };
    case "admin":
      return {
        text: "Admin",
        link: "/admin",
      };
    case "locations":
      return {
        text: "Locations",
        link: "/admin/locations",
      };
    case "add":
      return {
        text: "Add a Location",
        link: "/admin/locations/add",
      };
  }
  return {
    text: "fix me",
    link: "",
  };
};

const siteBreadcrumbMapper = (path: string): BreadcrumbData => {
  return {
    text: "implement me",
    link: path,
  };
};
