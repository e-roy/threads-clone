// components/Media/LinkPreviewAttachment.tsx

import Image from "next/image";
import { useTailwindBreakpoint } from "@/hooks/use-tailwind-breakpoint";

type LinkPreviewAttachmentType = {
  display_url: string;
  image_url: string;
  title: string;
  url: string;
};

interface LinkPreviewAttachmentProps {
  linkPreviewAttachment: LinkPreviewAttachmentType;
}

export const LinkPreviewAttachment = ({
  linkPreviewAttachment,
}: LinkPreviewAttachmentProps) => {
  //   console.log("linkPreviewAttachment", linkPreviewAttachment);
  const breakpoint = useTailwindBreakpoint();

  const handleLinkClick = () => {
    window.open(linkPreviewAttachment.url, "_blank");
  };
  return (
    <div
      className={`border-2 rounded-lg mb-2 cursor-pointer`}
      style={{
        width: breakpoint === "xs" ? "300px" : "400px",
      }}
      onClick={handleLinkClick}
    >
      <div
        className={`relative rounded-t-lg`}
        style={{
          overflow: "hidden",
          height: "175px",
        }}
      >
        <Image
          src={linkPreviewAttachment.image_url}
          alt={linkPreviewAttachment.title}
          width={800}
          height={800}
          className={`rounded-t-lg absolute`}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      <div className={`p-4`}>
        <div className={`text-sm text-zinc-500 dark:text-zinc-600`}>
          {linkPreviewAttachment.display_url}
        </div>
        <div className={`text-base truncate text-zinc-900 dark:text-zinc-100`}>
          {linkPreviewAttachment.title}
        </div>
      </div>
    </div>
  );
};
