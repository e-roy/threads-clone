// components/Threads/PostContent.tsx

import Image from "next/image";
import {
  LinkPreviewAttachment,
  CarouselComponent,
  VideoComponent,
} from "@/components/Media";
import { Post } from "threads-api";
import { IMedia, CanidatesType } from "@/types";

import { useRouter } from "next/navigation";
import { LinkUrl, LinkProfile } from "@/lib/LinkHighlights";
import { useCallback } from "react";

interface IPostContentProps {
  post: Post;
}

export const PostContent: React.FC<IPostContentProps> = ({ post }) => {
  const {
    id,
    caption,
    carousel_media,
    video_versions,
    image_versions2,
    original_height,
    original_width,
    user,
    text_post_app_info,
    has_audio,
  } = post;

  // console.log("post ====>", post);

  const media: IMedia = {
    has_audio,
    id,
    image_versions2: image_versions2 as unknown as CanidatesType[],
    original_height,
    original_width,
    video_versions,
  };

  const { candidates = [] } = image_versions2;
  const { link_preview_attachment = null } = text_post_app_info;

  const router = useRouter();

  const handleLinkToPost = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/t/${post.code}`);
    },
    [router, post.code]
  );

  return (
    <>
      <div
        onClick={handleLinkToPost}
        className="whitespace-pre-line text-zinc-800 dark:text-zinc-200 break-words text-sm sm:text-base cursor-pointer"
      >
        <LinkUrl className="text-blue-600 hover:text-blue-500 z-50">
          <LinkProfile className="text-blue-600 hover:text-blue-500 z-20 cursor-pointer">
            {caption?.text}
          </LinkProfile>
        </LinkUrl>
      </div>
      <div className={`mt-2`}>
        {carousel_media ? (
          <CarouselComponent carousel_media={carousel_media} />
        ) : video_versions.length > 0 ? (
          <VideoComponent media={media} />
        ) : (
          candidates.length > 0 && (
            <div>
              <Image
                src={candidates[0].url}
                alt={user.username}
                width={candidates[0].width}
                height={candidates[0].height}
                className="rounded-md shadow mt-2"
              />
            </div>
          )
        )}
        {link_preview_attachment && (
          <LinkPreviewAttachment
            linkPreviewAttachment={link_preview_attachment}
          />
        )}
      </div>
    </>
  );
};
