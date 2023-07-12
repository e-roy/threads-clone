"use client";
// components/Threads/PostFeed.tsx

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Thread as ThreadType, Post as PostType } from "threads-api";
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

export const PostFeed = ({ posts }: { posts: ThreadType[] }) => {
  //   console.log(posts);

  return (
    <div className="w-full">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

const Post = ({ post }: { post: ThreadType }) => {
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

  //   console.log("post", post);

  const { quoted_post, reposted_post } =
    post.thread_items[0].post.text_post_app_info.share_info;

  let postInfo: PostType;

  if (reposted_post) {
    // TODO: threads-types.d.ts(78, 5): 'media_overlay_info' is declared here.
    postInfo = reposted_post as PostType;
  } else {
    postInfo = post.thread_items[0].post;
  }

  return (
    <>
      {reposted_post && (
        <div className={`flex space-x-4 mb-2 text-zinc-500`}>
          <div className={`ml-5 my-auto`}>
            <Repeat className={`h-4 w-4`} />
          </div>
          <div>{post.thread_items[0].post.user.username} reposted</div>
        </div>
      )}
      <div className={`border-b mb-4 pb-4 flex space-x-4`}>
        <div>
          <Image
            className="rounded-full"
            src={postInfo.user.profile_pic_url}
            alt={postInfo.user.username}
            width={40}
            height={40}
          />
        </div>
        <div className={`w-full`}>
          <div className={`flex justify-between`}>
            <div
              className={`flex font-semibold text-zinc-900 dark:text-zinc-100 hover:underline`}
            >
              <Link href={`/${postInfo.user.username}`}>
                {postInfo.user.username}
              </Link>
              {postInfo.user.is_verified && <VerifiedIcon />}
            </div>
            <div
              className={`font-light text-zinc-600 dark:text-zinc-400 flex space-x-4`}
            >
              <span>
                {timeago.format((postInfo.taken_at * 1000) as timeago.TDate)}
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
                  onClick={() => handleCopy(postInfo.code)}
                >
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div
            className={`whitespace-pre-line text-zinc-800 dark:text-zinc-200 break-words  `}
          >
            {postInfo.caption?.text}
          </div>
          {postInfo.image_versions2.candidates.length > 0 && (
            <div>
              <Image
                src={postInfo.image_versions2.candidates[0].url}
                alt={postInfo.user.username}
                width={postInfo.image_versions2.candidates[0].width}
                height={postInfo.image_versions2.candidates[0].height}
                className={`rounded-md shadow mt-2`}
              />
            </div>
          )}
          {/* {postInfo.video_versions.length > 0 && (
            <div>
              <VideoComponent source={postInfo.video_versions[0]} />
            </div>
          )} */}
          {quoted_post && <SharedCard post={post} />}
          <PostActions />
          <div className={`flex space-x-4 mt-2`}>
            {post.thread_items[0].view_replies_cta_string && (
              <div
                className={`hover:underline hover:cursor-pointer text-zinc-700 dark:text-zinc-300 mb-4`}
              >
                {post.thread_items[0].view_replies_cta_string}
              </div>
            )}
            {postInfo.like_count > 0 && (
              <div
                className={`hover:underline hover:cursor-pointer text-zinc-700 dark:text-zinc-300 mb-4`}
              >
                {postInfo.like_count} likes
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
