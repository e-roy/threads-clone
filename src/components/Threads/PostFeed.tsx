"use client";
// components/Threads/PostFeed.tsx

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Thread as ThreadType,
  Post as PostType,
  ThreadItem,
} from "threads-api";
import * as timeago from "timeago.js";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { VerifiedIcon } from "@/components/icons/VerifiedIcon";

import { PostActions } from "./PostActions";
import { SharedCard } from "./SharedCard";

import { Repeat } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { PostContent } from "./PostContent";
import { RepostedPost } from "./RepostedPost";

export const PostFeed = ({ posts }: { posts: ThreadType[] }) => {
  // console.log(posts);
  // console.log("posts ====>", JSON.stringify(posts, null, 2));
  return (
    <div className="w-full">
      {posts.map((post: ThreadType) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

const Post = ({ post }: { post: ThreadType }) => {
  if (!post.thread_items[0]) return null;

  const { quoted_post, reposted_post } =
    post.thread_items[0].post.text_post_app_info.share_info;

  if (reposted_post && "id" in reposted_post)
    return (
      <div className={`border-b-2 mb-4 pb-4`}>
        <RepostInfo post={post} />
        <RepostedPost post={reposted_post as PostType} />
      </div>
    );

  return (
    <div className={`border-b-2 mb-4 pb-4`}>
      {post.thread_items.map((threadItem: ThreadItem) => (
        <PostItem threadItem={threadItem} key={threadItem.post.id} />
      ))}
    </div>
  );
};

const RepostInfo = ({ post }: { post: ThreadType }) => (
  <div className={`flex space-x-4 mb-2 text-zinc-500`}>
    <div className={`ml-5 my-auto`}>
      <Repeat className={`h-4 w-4`} />
    </div>
    <div>{post.thread_items[0].post.user.username} reposted</div>
  </div>
);

const PostItem = ({ threadItem }: { threadItem: ThreadItem }) => {
  const {
    line_type,
    post,
    should_show_replies_cta,
    view_replies_cta_string,
    reply_facepile_users,
  } = threadItem;

  const { quoted_post, reposted_post } = post.text_post_app_info.share_info;

  const { toast } = useToast();
  const handleCopy = useCallback(
    (postId: string) => {
      navigator.clipboard.writeText(`https://threads.net/t/${postId}`);
      toast({
        title: "Copied",
      });
    },
    [toast]
  );

  return (
    <>
      <div className={`flex space-x-4 mt-2`}>
        <div className={`flex flex-col space-y-4`}>
          <Image
            className="rounded-full"
            src={post.user.profile_pic_url}
            alt={post.user.username}
            width={40}
            height={40}
          />
          {line_type === "line" && (
            <div className={`grid grid-cols-2 grow`}>
              <div
                className={`border-r-2 border-zinc-300 dark:border-zinc-700`}
              />
              <div />
            </div>
          )}
          {line_type === "squiggle" && (
            <div className={`grid grid-cols-2 grow`}>
              <div
                className={`border-r-2 border-blue-600 dark:border-blue-400`}
              />
              <div />
            </div>
          )}
          {reply_facepile_users && (
            <>
              <div className={`relative ml-4`}>
                {reply_facepile_users.slice(0, 2).map((user, index) => (
                  <Image
                    key={user.profile_pic_url}
                    className={`rounded-full absolute border-2 ${
                      index !== 0 && "-left-4 -z-10"
                    }`}
                    src={user.profile_pic_url}
                    alt={`avatar`}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
              <div className={`h-5`} />
            </>
          )}
        </div>
        <div className={`w-full`}>
          <div className={`flex justify-between -mt-2`}>
            <div
              className={`flex font-semibold text-zinc-900 dark:text-zinc-100 hover:underline my-auto`}
            >
              <Link href={`/${post.user.username}`}>{post.user.username}</Link>
              {post.user.is_verified && (
                <span
                  className={`m-auto pl-1 text-zinc-100 dark:text-zinc-900`}
                >
                  <VerifiedIcon />
                </span>
              )}
            </div>
            <div
              className={`font-light text-zinc-600 dark:text-zinc-400 flex space-x-4`}
            >
              <span>
                {timeago.format((post.taken_at * 1000) as timeago.TDate)}
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    id={`post-${post.code}`}
                    size={"icon"}
                    variant="outline"
                    className={`p-0.5 h-8 w-8 hover:scale-105 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800`}
                  >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[160px]"
                  onClick={() => handleCopy(post.code)}
                >
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <PostContent post={post} />

          {quoted_post && <SharedCard post={quoted_post} />}

          <Link href={`/t/${post.code}`}>
            <PostActions />

            <div
              className={`flex space-x-4 mt-2 mb-4 text-zinc-400 dark:text-zinc-400`}
            >
              {should_show_replies_cta && (
                <div className={`hover:underline hover:cursor-pointer`}>
                  {view_replies_cta_string}
                </div>
              )}
              {should_show_replies_cta && post.like_count > 0 && (
                <span className={``}>·</span>
              )}
              {post.like_count > 0 && (
                <div className={`hover:underline hover:cursor-pointer`}>
                  {post.like_count} likes
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
