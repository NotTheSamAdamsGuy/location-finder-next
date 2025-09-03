"use client";

import { logout } from "../actions/auth";
import { User } from "../lib/definitions";

export default function LogoutLink({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  const handleLogoutClick = async () => {
    logout();
  };

  let logoutLink: React.ReactNode = "";

  if (user) {
    logoutLink = (
      <button
        className={`${className}`}
        onClick={handleLogoutClick}
      >
        Log Out
      </button>
    );
  }

  return logoutLink;
}
