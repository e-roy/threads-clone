// lib/LinkHighlights\profile.tsx
import React from "react";
import Link from "next/link";
import type { LinkProps } from "@/types/links";

export const profileRegex = /\B@([\w.\w_]+)/;

export const ProfileComponent: React.FC<LinkProps> = ({ match, className }) => {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };

  return (
    <Link href={`/${match.slice(1)}`}>
      <span className={className} onClick={handleClick}>
        {match}
      </span>
    </Link>
  );
};
