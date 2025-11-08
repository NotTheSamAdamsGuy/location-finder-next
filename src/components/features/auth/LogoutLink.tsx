"use client";

import { UserProfile } from "@notthesamadamsguy/location-finder-types";

import { logout } from "@/formActions/auth";

export default function LogoutLink({
  user,
  className,
}: {
  user: UserProfile;
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
