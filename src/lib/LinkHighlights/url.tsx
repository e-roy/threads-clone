// lib/LinkHighlights\url.tsx
import React from "react";

import { LinkProps } from "@/types/links";

export const urlRegex =
  /(https?:\/\/|www\.)([-\w.]+\/[\p{L}\p{Emoji}\p{Emoji_Component}!#$%&'"()*+,./\\:;=_?@[\]~-]*[^\s'",.;:\b)\]}?]|(([\w-]+\.)+[\w-]+[\w/-]))/u;

export const UrlComponent: React.FC<LinkProps> = ({
  match: url,
  className,
}) => {
  const displayUrl = url.length > 30 ? url.slice(0, 30) + "..." : url;
  const formattedUrl = /^www\./.exec(url) ? `http://${url}` : url;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <a
      className={className}
      href={formattedUrl}
      target="_blank"
      rel="noreferrer noopener"
      onClick={handleClick}
    >
      {displayUrl}
    </a>
  );
};
