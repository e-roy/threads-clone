"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { ThreadsUser } from "threads-api";
import { Instagram } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { VerifiedIcon } from "@/components/icons/VerifiedIcon";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { formatFollowCount } from "@/lib/format-follow-count";

type ProfileHeaderProps = {
  user: ThreadsUser;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { toast } = useToast();
  //   console.log("user", user);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`https://threads.net/@${user.username}`);
    toast({
      title: "Copied",
    });
  }, [toast, user.username]);

  return (
    <div className="w-full my-4">
      <div className={`flex`}>
        <div className={`w-full my-auto`}>
          <div className="text-2xl font-bold">{user.full_name}</div>
          <div className="text-sm text-zinc-800 dark:text-zinc-200 mt-1">
            {user.username}
            <span
              className={`ml-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-100 py-0.5 px-2 text-xs my-auto rounded-full`}
            >
              threads.net
            </span>
          </div>
        </div>
        <div className={`w-24 relative`}>
          <Image
            className="rounded-full"
            src={user.profile_pic_url}
            alt="profile"
            width={350}
            height={350}
          />
          {user.is_verified && (
            <span
              className={`absolute -mt-5 ml-1 text-zinc-100 dark:text-zinc-900`}
            >
              <VerifiedIcon size={`MEDIUM`} />
            </span>
          )}
        </div>
      </div>

      <div className="text-base text-zinc-900 dark:text-zinc-100 mt-4 whitespace-pre">
        {user.biography}
      </div>
      <div className="text-sm text-zinc-400 dark:text-zinc-400 mt-4 flex w-full">
        <div className={`w-full`}>
          <span className={`hover:underline cursor-pointer`}>
            {formatFollowCount(user.follower_count)} followers
          </span>
          {user.bio_links[0] && user.bio_links[0].url && (
            <>
              {" "}
              ·{" "}
              <a
                href={user.bio_links[0].url}
                target="_blank"
                rel="noreferrer noopener"
                className={`hover:underline w-full`}
              >
                {user.bio_links[0].url}
              </a>
            </>
          )}
        </div>
        <div className={`flex space-x-4 text-zinc-900 dark:text-zinc-100`}>
          <a
            href={`https://www.instagram.com/${user.username}`}
            target="_blank"
            rel="noreferrer noopener"
            className={`hover:underline`}
          >
            <Instagram className={`hover:scale-105`} />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant="outline"
                className="flex hover:scale-105 border-2 border-zinc-900 dark:border-zinc-100 rounded-full data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[160px]"
              onClick={handleCopy}
            >
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
