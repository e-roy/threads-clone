// components/Threads/SharedCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Post } from "threads-api";
import { formatTime } from "@/lib/format-time";
import { Card } from "@/components/ui/card";
import { VerifiedIcon } from "@/components/icons/VerifiedIcon";
import { PostContent } from "./PostContent";

interface SharedCardProps {
  post: Post;
}

export const SharedCard = ({ post }: SharedCardProps) => {
  const { user, text_post_app_info, taken_at, code, like_count } = post;

  return (
    <Card className={`p-4 mt-4`}>
      <div className={`flex space-x-4`}>
        <div>
          <Image
            className="rounded-full"
            src={user.profile_pic_url}
            alt="profile"
            width={25}
            height={25}
          />
        </div>

        <div className={`flex justify-between w-full`}>
          <div
            className={`flex font-semibold text-zinc-900 dark:text-zinc-100 hover:underline`}
          >
            <Link href={`/${user.username}`}>{user.username}</Link>
            {user.is_verified && (
              <span className={`m-auto pl-1 text-zinc-100 dark:text-zinc-900`}>
                <VerifiedIcon />
              </span>
            )}
          </div>
          <div
            className={`font-light text-zinc-600 dark:text-zinc-400 flex space-x-4`}
          >
            <span>{formatTime(taken_at * 1000)}</span>
          </div>
        </div>
      </div>

      <PostContent post={post} />

      <div
        className={`flex space-x-4 mt-2 mb-2 text-sm text-zinc-400 dark:text-zinc-400`}
      >
        {text_post_app_info.direct_reply_count > 0 && (
          <div className={`hover:underline hover:cursor-pointer`}>
            {text_post_app_info.direct_reply_count} replies
          </div>
        )}
        {text_post_app_info.direct_reply_count > 0 && post.like_count > 0 && (
          <span className={``}>·</span>
        )}
        {like_count > 0 && (
          <div className={`hover:underline hover:cursor-pointer`}>
            {like_count.toLocaleString("en-US")} likes
          </div>
        )}
      </div>
    </Card>
  );
};
