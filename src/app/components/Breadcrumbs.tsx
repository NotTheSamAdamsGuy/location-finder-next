"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export type BreadcrumbData = {
  text: React.ReactNode;
  link: string;
};

export default function Breadcrumbs({
  type,
  className = "text-sm bg-base-300 px-3 border-0 border-base-300 border-b border-t",
}: {
  type: "admin" | "site";
  className?: string;
}) {
  const pathname = usePathname();
  const breadcrumbsPaths = pathname?.split("/");
  const breadcrumbItems: React.ReactNode[] = [];
  const mappingFunction =
    type === "admin" ? adminBreadcrumbMapper : siteBreadcrumbMapper;

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
  path = decodeURIComponent(path);
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
    case "tags":
      return {
        text: "Tags",
        link: "/admin/tags",
      };
    case "users": 
      return {
        text: "Users",
        link: "/admin/users"
      };
    default:
      return {
        text: path,
        link: `/admin/${path}`,
      };
  }
};

const siteBreadcrumbMapper = (path: string): BreadcrumbData => {
  return {
    text: "implement me",
    link: path,
  };
};
