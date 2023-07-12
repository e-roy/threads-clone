// components/Threads/SharedCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Thread, Post } from "threads-api";
import * as timeago from "timeago.js";
import { Card } from "@/components/ui/card";
import { RepostedPost } from "./RepostedPost";
import { VerifiedIcon } from "@/components/icons/VerifiedIcon";

interface SharedCardProps {
  post: Thread;
}

export const SharedCard = ({ post }: SharedCardProps) => {
  const { quoted_post, reposted_post } =
    post.thread_items[0].post.text_post_app_info.share_info;

  if (reposted_post && "id" in reposted_post)
    return <RepostedPost post={reposted_post as Post} />;
  if (!quoted_post || !("id" in quoted_post)) return null;

  const userInfo = quoted_post.user;
  const postInfo = quoted_post.text_post_app_info;

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

        <div className={`w-full`}>
          <div className={`flex justify-between`}>
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
                {timeago.format((quoted_post.taken_at * 1000) as timeago.TDate)}
              </span>
            </div>
          </div>
          <div
            className={`whitespace-pre-line text-zinc-800 dark:text-zinc-200 break-words text-sm`}
          >
            {quoted_post.caption?.text}
          </div>

          <div className={`flex space-x-4 mt-2 text-sm`}>
            {postInfo.direct_reply_count > 0 && (
              <div
                className={`hover:underline hover:cursor-pointer text-zinc-400 dark:text-zinc-500 mb-4`}
              >
                {postInfo.direct_reply_count} replies
              </div>
            )}
            {quoted_post.like_count > 0 && (
              <div
                className={`hover:underline hover:cursor-pointer text-zinc-400 dark:text-zinc-500 mb-4`}
              >
                {quoted_post.like_count} likes
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
