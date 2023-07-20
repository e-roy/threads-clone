// components/Threads/PostContent.tsx

import Image from "next/image";
import {
  LinkPreviewAttachment,
  CarouselComponent,
  VideoComponent,
} from "@/components/Media";
import { Post } from "threads-api";

interface IPostContentProps {
  post: Post;
}

export const PostContent: React.FC<IPostContentProps> = ({ post }) => {
  // console.log("post content =====>", post);

  const {
    caption,
    carousel_media,
    video_versions,
    image_versions2,
    user,
    text_post_app_info,
  } = post;

  const { candidates = [] } = image_versions2;
  const { link_preview_attachment = null } = text_post_app_info;

  return (
    <>
      <div className="whitespace-pre-line text-zinc-800 dark:text-zinc-200 break-words">
        {caption?.text}
      </div>
      <div className={`mt-2`}>
        {carousel_media ? (
          <CarouselComponent carousel_media={carousel_media} />
        ) : video_versions.length > 0 ? (
          <VideoComponent source={video_versions} />
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
