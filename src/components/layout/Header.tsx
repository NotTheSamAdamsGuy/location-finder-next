import { cookies } from "next/headers";
import { UserProfile } from "@notthesamadamsguy/location-finder-types";

import { getUser } from "@/lib/session";
import Navbar from "../features/Navbar";

export default async function Header() {
  const siteName = process.env.SITE_NAME ?? "site name";

  const token: string = (await cookies()).get("accessToken")?.value as string;
  const user: UserProfile = await getUser(token);

  return (
    <header>
      <Navbar user={user} siteName={siteName} />
    </header>
  );
}
