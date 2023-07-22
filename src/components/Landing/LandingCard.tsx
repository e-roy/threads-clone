"use client";
// components/Landing/LandingCard.tsx

import { useState } from "react";
import { Loading } from "@/components/Messages";

import { Github } from "lucide-react";
import Link from "next/link";

export const LandingCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = () => {
    setIsLoading(true);
  };

  return (
    <div
      className={`bg-zinc-900 text-zinc-100 text-xl font-medium border-2 rounded-lg absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className={`p-8 text-center space-y-2`}>
        <div className={`text-base`}>Open Source</div>
        <div>Clone of</div>
        <div>Threads webapp</div>
      </div>
      <div className={`p-4 border-t-2 flex justify-between`}>
        {isLoading ? (
          <Loading />
        ) : (
          <Link
            href={`/marvel`}
            className="hover:scale-110 duration-300 w-full flex content-center justify-center"
            onClick={handleLinkClick}
          >
            @Marvel
          </Link>
        )}
        <a
          href={`https://github.com/e-roy/threads-clone`}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:scale-110 duration-300  w-full flex content-center justify-center"
        >
          <Github />
        </a>
      </div>
    </div>
  );
};
