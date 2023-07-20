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
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

const Post = ({ post }: { post: ThreadType }) => {
  // console.log("post", post);

  const { quoted_post, reposted_post } =
    post.thread_items[0].post.text_post_app_info.share_info;

  if (reposted_post && "id" in reposted_post)
    return (
      <div className={`border-b mb-4 pb-4`}>
        <div className={`flex space-x-4 mb-2 text-zinc-500`}>
          <div className={`ml-5 my-auto`}>
            <Repeat className={`h-4 w-4`} />
          </div>
          <div>{post.thread_items[0].post.user.username} reposted</div>
        </div>
        <RepostedPost post={reposted_post as PostType} />
      </div>
    );

  const initialPost = post.thread_items[0];
  const replyPost = post.thread_items[1];

  return (
    <div className={`border-b mb-4 pb-4`}>
      {reposted_post && (
        <div className={`flex space-x-4 mb-2 text-zinc-500`}>
          <div className={`ml-5 my-auto`}>
            <Repeat className={`h-4 w-4`} />
          </div>
          <div>{post.thread_items[0].post.user.username} reposted</div>
        </div>
      )}
      <PostItem threadItem={initialPost} />
      {replyPost && <PostItem threadItem={replyPost} />}
    </div>
  );
};

const PostItem = ({ threadItem }: { threadItem: ThreadItem }) => {
  const { line_type, post, view_replies_cta_string, reply_facepile_users } =
    threadItem;

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
  // console.log("threadItem", threadItem);
  // console.log("post", post);
  // console.log("line_type", line_type);
  return (
    <>
      <div className={`flex space-x-4`}>
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
                className={`border-r-2 border-zinc-300 dark:border-zinc-200`}
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
          )}
          <div className={`h-5`} />
        </div>
        <div className={`w-full`}>
          <div className={`flex justify-between`}>
            <div
              className={`flex font-semibold text-zinc-900 dark:text-zinc-100 hover:underline`}
            >
              <Link href={`/${post.user.username}`}>{post.user.username}</Link>
              {post.user.is_verified && <VerifiedIcon />}
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

          <PostActions />

          <div
            className={`flex space-x-4 mt-2 text-zinc-400 dark:text-zinc-400`}
          >
            {view_replies_cta_string && (
              <div className={`hover:underline hover:cursor-pointer mb-4`}>
                {view_replies_cta_string}
              </div>
            )}
            {view_replies_cta_string && post.like_count > 0 && (
              <span className={``}>·</span>
            )}
            {post.like_count > 0 && (
              <div className={`hover:underline hover:cursor-pointer mb-4`}>
                {post.like_count} likes
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
