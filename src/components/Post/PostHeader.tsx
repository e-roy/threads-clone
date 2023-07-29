"use client";

import Link from "next/link";
import Image from "next/image";
import { Thread } from "threads-api";
import { PostContent } from "@/components/Threads/PostContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VerifiedIcon } from "@/components/icons/VerifiedIcon";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { formatTime } from "@/lib/format-time";
import { useCallback } from "react";

export const PostHeader = ({ thread }: { thread: Thread }) => {
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
  // console.log("thread", thread);

  const post = thread.thread_items[0].post;

  if (!post) return null;

  return (
    <div>
      <div className={`flex justify-between`}>
        <div className={`flex mb-2`}>
          <Image
            className="rounded-full"
            src={post.user.profile_pic_url}
            alt={post.user.username}
            width={40}
            height={40}
          />
          <div
            className={`flex font-semibold text-zinc-900 dark:text-zinc-100 hover:underline pl-4 m-auto`}
          >
            <Link href={`/${post.user.username}`}>{post.user.username}</Link>
            {post.user.is_verified && (
              <span className={`m-auto pl-1 text-zinc-100 dark:text-zinc-900`}>
                <VerifiedIcon />
              </span>
            )}
          </div>
        </div>

        <div>
          <div
            className={`font-light text-zinc-600 dark:text-zinc-400 flex space-x-4`}
          >
            <span>{formatTime(post.taken_at * 1000)}</span>

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
      </div>
      <PostContent post={post} />
    </div>
  );
};
