import Image from "next/image";

import background from "@/../public/hero-bg.webp"; // Adjust path as needed
import LocationSearchForm from "@/components/features/search/LocationSearchForm";

export default function Home() {
  return (
    <div className="font-sans min-h-[calc(100vh-64px)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full h-full relative">
          <Image
            src={background}
            alt="Background"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              zIndex: -1,
            }}
            priority
          />
          <div className="hero h-64 sm:h-96 px-8 sm:px-24 md:px-52">
            <div className="w-full flex-col">
              <p className="text-white text-4xl sm:text-6xl font-extrabold">
                Locations. Places.
              </p>
              <p className="text-white text-4xl sm:text-6xl font-extrabold mb-4">
                Things to See.
              </p>
              <LocationSearchForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
