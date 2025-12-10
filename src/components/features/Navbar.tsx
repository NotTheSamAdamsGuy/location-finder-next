"use client";

import { UserProfile } from "@notthesamadamsguy/location-finder-types";
import LogoutLink from "./auth/LogoutLink";
import Link from "next/link";

function AdminLink({role}: {role: string | null}) {
  let adminLink: React.ReactNode = "";

  if (role === "ADMIN") {
    adminLink = <li><Link href="/admin">Admin</Link></li>;
  }
  
  return adminLink;
}

interface Props {
  user: UserProfile;
  siteName: string;
}
export default function Navbar({ user, siteName }: Props) {
  return (
    <div
      className="navbar bg-base-100 shadow-sm"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <AdminLink role={user.role} />
            <li>
              <Link href="locations?lat=47.627663&lon=-122.342682">
                Locations Page
              </Link>
            </li>
            <li>
              <LogoutLink user={user} />
            </li>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          {siteName}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
          <AdminLink role={user?.role} />
          <li>
            <LogoutLink user={user} />
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
}
