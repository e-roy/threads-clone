// components/Threads/SharedCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Thread, Post } from "threads-api";
import * as timeago from "timeago.js";
import { Card } from "@/components/ui/card";
import { RepostedPost } from "./RepostedPost";
import { VerifiedIcon } from "@/components/icons/VerifiedIcon";
import { PostContent } from "./PostContent";

interface SharedCardProps {
  post: Post;
}

export const SharedCard = ({ post }: SharedCardProps) => {
  // const { quoted_post, reposted_post } = post.text_post_app_info.share_info;

  // if (reposted_post && "id" in reposted_post)
  //   return <RepostedPost post={reposted_post as Post} />;
  // if (!quoted_post || !("id" in quoted_post)) return null;

  const userInfo = post.user;
  const postInfo = post.text_post_app_info;

  return (
    <Card className={`p-4 mt-4`}>
      <div className={`flex space-x-4`}>
        <div>
          <Image
            className="rounded-full"
            src={userInfo.profile_pic_url}
            alt="profile"
            width={25}
            height={25}
          />
        </div>

        <div className={`flex justify-between w-full`}>
          <div
            className={`flex font-semibold text-zinc-900 dark:text-zinc-100 hover:underline`}
          >
            <Link href={`/${userInfo.username}`}>{userInfo.username}</Link>
            {userInfo.is_verified && <VerifiedIcon />}
          </div>
          <div
            className={`font-light text-zinc-600 dark:text-zinc-400 flex space-x-4`}
          >
            <span>
              {timeago.format((post.taken_at * 1000) as timeago.TDate)}
            </span>
          </div>
        </div>
      </div>

      <PostContent post={post} />

      <div className={`flex space-x-4 mt-2 text-sm`}>
        {postInfo.direct_reply_count > 0 && (
          <div
            className={`hover:underline hover:cursor-pointer text-zinc-400 dark:text-zinc-500 mb-4`}
          >
            {postInfo.direct_reply_count} replies
          </div>
        )}
        {post.like_count > 0 && (
          <div
            className={`hover:underline hover:cursor-pointer text-zinc-400 dark:text-zinc-500 mb-4`}
          >
            {post.like_count} likes
          </div>
        )}
      </div>
    </Card>
  );
};
