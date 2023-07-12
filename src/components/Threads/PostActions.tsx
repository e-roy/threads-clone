"use client";
// components/Threads/PostActions.tsx

import { FC, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, Repeat, LucideProps } from "lucide-react";

export const PostActions = () => {
  const handleHeartClick = useCallback(() => {
    console.log("Heart clicked");
  }, []);

  const handleMessageCircleClick = useCallback(() => {
    console.log("MessageCircle clicked");
  }, []);

  const handleSendClick = useCallback(() => {
    console.log("Send clicked");
  }, []);

  const handleRepeatClick = useCallback(() => {
    console.log("Repeat clicked");
  }, []);

  const icons: { Icon: FC<LucideProps>; onClick: () => void }[] = [
    {
      Icon: Heart,
      onClick: handleHeartClick,
    },
    {
      Icon: MessageCircle,
      onClick: handleMessageCircleClick,
    },
    {
      Icon: Send,
      onClick: handleSendClick,
    },
    {
      Icon: Repeat,
      onClick: handleRepeatClick,
    },
  ];

  return (
    <div className="flex space-x-4 text-zinc-900 dark:text-zinc-200 mt-2">
      {icons.map(({ Icon, onClick }, index) => (
        <Button
          key={index}
          size="icon"
          variant="outline"
          className="p-0.5 h-8 w-8 hover:scale-105 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={onClick}
        >
          <Icon className="hover:scale-105 duration-300" />
        </Button>
      ))}
    </div>
  );
};
