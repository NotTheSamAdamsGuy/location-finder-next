import Link from "next/link";
import { cookies } from "next/headers";

import { getUser } from "../lib/session";
import LogoutLink from "./LogoutLink";
import { User } from "../lib/definitions";

export default async function Header() {
  const siteName = process.env.SITE_NAME;

  const token: string = (await cookies()).get("token")?.value as string;
  const user: User = await getUser(token);

  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
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
              <li><Link href="locations?lat=47.627663&lon=-122.342682">Locations Page</Link></li>
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
          <Link href="/" className="btn btn-ghost text-xl">{siteName}</Link>
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
    </header>
  );
}

function AdminLink({role}: {role: string | null}) {
  let adminLink: React.ReactNode = "";

  if (role === "ADMIN") {
    adminLink = <li><Link href="/admin">Admin</Link></li>;
  }
  
  return adminLink;
}
