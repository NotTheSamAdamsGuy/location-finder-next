"use client";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function MobileNavBar() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="absolute top-0 p-3 md:hidden">
      <button
        className="flex justify-center items-center w-12 h-12 rounded-full bg-red-500 opacity-75 cursor-pointer"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="fa-xl" />
      </button>
    </div>
  );
}
