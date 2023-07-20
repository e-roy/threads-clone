"use client";
// components/Threads/RepostedPost.tsx

import Image from "next/image";
import Link from "next/link";
import { Post as PostType } from "threads-api";
import * as timeago from "timeago.js";
import { VerifiedIcon } from "@/components/icons/VerifiedIcon";
import { PostContent } from "./PostContent";

interface Props {
  post: PostType;
}

export const RepostedPost: React.FC<Props> = ({ post }) => {
  const { user } = post;

  const commonStyles =
    "hover:underline hover:cursor-pointer text-zinc-400 dark:text-zinc-500 mb-4";

  return (
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

      <div className={`w-full`}>
        <div className={`flex justify-between`}>
          <div
            className={`flex font-semibold text-zinc-900 dark:text-zinc-100 hover:underline`}
          >
            <Link href={`/${user.username}`}>{user.username}</Link>
            {user.is_verified && <VerifiedIcon />}
          </div>
          <div
            className={`font-light text-zinc-600 dark:text-zinc-400 flex space-x-4`}
          >
            <span>
              {timeago.format((post.taken_at * 1000) as timeago.TDate)}
            </span>
          </div>
        </div>
        <PostContent post={post} />

        <div className={`flex space-x-4 mt-2 text-sm`}>
          {post.text_post_app_info.direct_reply_count && (
            <div className={commonStyles}>
              {post.text_post_app_info.direct_reply_count} replies
            </div>
          )}
          {post.like_count > 0 && (
            <div className={commonStyles}>{post.like_count} likes</div>
          )}
        </div>
      </div>
    </div>
  );
};
