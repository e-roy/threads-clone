"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ThreadsUser } from "threads-api";

export interface ProfileNavProps {
  user: ThreadsUser;
}

export const ProfileNav = ({ user }: ProfileNavProps) => {
  const pathname = usePathname();
  //   console.log("pathname", pathname);

  const navItems = useMemo(
    () => [
      {
        name: "Threads",
        href: `/${user.username}`,
      },
      {
        name: "Replies",
        href: `/${user.username}/replies`,
      },
    ],
    [user.username]
  );

  return (
    <div className="w-full h-12 mb-2">
      <div className={cn("flex w-full h-full")}>
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={cn(
              "w-full text-center pt-2 h-full",
              pathname === item.href
                ? "font-semibold text-primary border-b border-zinc-800 dark:border-zinc-200"
                : "font-medium text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
