// components/Threads/PostContent.tsx

import Image from "next/image";
import { LinkPreviewAttachment } from "./LinkPreviewAttachment";
import { Post } from "threads-api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IPostContentProps {
  post: Post;
}

export const PostContent: React.FC<IPostContentProps> = ({ post }) => {
  // console.log("post content =====>", post);
  return (
    <>
      <div
        className={`whitespace-pre-line text-zinc-800 dark:text-zinc-200 break-words  `}
      >
        {post.caption?.text}
      </div>
      {post.carousel_media ? (
        <Carousel
          showArrows={true}
          showStatus={false}
          useKeyboardArrows={true}
          swipeable={true}
          emulateTouch={true}
          showThumbs={false}
          showIndicators={false}
          className="carousel-container"
        >
          {post.carousel_media.map((media: any) => (
            <div key={media.id} className="carousel-item">
              <div className="aspect-content">
                <Image
                  src={media.image_versions2.candidates[0].url}
                  alt={post.user.username}
                  width={media.original_width}
                  height={media.original_height}
                  // height={400}
                  className="carousel-image"
                />
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <>
          {post.image_versions2.candidates.length > 0 && (
            <div>
              <Image
                src={post.image_versions2.candidates[0].url}
                alt={post.user.username}
                width={post.image_versions2.candidates[0].width}
                height={post.image_versions2.candidates[0].height}
                className={`rounded-md shadow mt-2`}
              />
            </div>
          )}
        </>
      )}

      {/* {post.video_versions.length > 0 && (
            <div>
              <VideoComponent source={post.video_versions[0]} />
            </div>
          )} */}
      {post.text_post_app_info.link_preview_attachment && (
        <LinkPreviewAttachment
          linkPreviewAttachment={
            post.text_post_app_info.link_preview_attachment
          }
        />
      )}
    </>
  );
};
