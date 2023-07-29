// components/Threads/PostContent.tsx

import Image from "next/image";
import {
  LinkPreviewAttachment,
  CarouselComponent,
  VideoComponent,
} from "@/components/Media";
import { Post } from "threads-api";
import Link from "next/link";
import { IMedia, CanidatesType } from "@/types";

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

  return (
    <>
      <Link href={`/t/${post.code}`}>
        <div className="whitespace-pre-line text-zinc-800 dark:text-zinc-200 break-words text-sm sm:text-base">
          {caption?.text}
        </div>
      </Link>
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
