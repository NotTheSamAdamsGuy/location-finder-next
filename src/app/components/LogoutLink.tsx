"use client";

import { logout } from "../actions/auth";

export default function LogoutLink({ className }: { className?: string }) {
  const handleLogoutClick = async () => {
    logout();
  };

  return (
    <button
      className={`cursor-pointer hover:underline text-2xl md:text-4xl ${className}`}
      onClick={handleLogoutClick}
    >
      Log Out
    </button>
  );
}