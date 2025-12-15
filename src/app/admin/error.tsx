"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
  };

  return (
    <div className="absolute top-1/3 w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-semibold mb-8">Oops!</h1>
        <p className="mb-8 px-8 text-center text-lg">
          An unexpected error has occurred. Please reload the page.
        </p>
        <button className="btn btn-primary flex" onClick={handleClick}>
          Reload
        </button>
      </div>
    </div>
  );
}
