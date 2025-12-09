"use client";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}
export default function MobileNavBar({className}: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className={twMerge("sticky top-0 md:hidden", className ? className : "")}>
      <div className="p-3">
        <button
          className="flex justify-center items-center w-12 h-12 rounded-full bg-base-100 opacity-75 cursor-pointer"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="fa-xl" />
        </button>
      </div>
    </div>
  );
}
