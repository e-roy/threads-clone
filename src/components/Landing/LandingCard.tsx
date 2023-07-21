// components/Landing/LandingCard.tsx

import { Github } from "lucide-react";
import Link from "next/link";

export const LandingCard = () => {
  return (
    <div
      className={`bg-zinc-900 text-zinc-100 text-xl font-medium border-2 rounded-lg absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className={`p-8 text-center space-y-2`}>
        <div className={`text-base`}>Open Source</div>
        <div>Clone of</div>
        <div>Threads webapp</div>
      </div>
      <div className={`py-4 px-8 border-t-2 flex justify-between`}>
        <Link href={`/marvel`} className="hover:scale-105 duration-300">
          Marvel
        </Link>
        <a
          href={`https://github.com/e-roy/threads-clone`}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:scale-105 duration-300"
        >
          <Github />
        </a>
      </div>
    </div>
  );
};
