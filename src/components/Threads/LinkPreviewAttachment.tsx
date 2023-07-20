// components/Threads/LinkPreviewAttachment.tsx

import Image from "next/image";

type LinkPreviewAttachmentType = {
  display_url: string;
  favicon_url: string;
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

  const handleLinkClick = () => {
    window.open(linkPreviewAttachment.url, "_blank");
  };
  return (
    <div
      className={`border rounded-lg mt-4 mb-2 cursor-pointer`}
      onClick={handleLinkClick}
    >
      <Image
        src={linkPreviewAttachment.image_url}
        alt={linkPreviewAttachment.title}
        width={800}
        height={800}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "unset",
          position: "relative",
          backgroundPosition: "center",
        }}
        className={`rounded-t-lg`}
      />

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
