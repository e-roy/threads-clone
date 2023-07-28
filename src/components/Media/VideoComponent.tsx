"use client";
// components/Media/VideoComponent.tsx

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IMedia } from "@/types";

interface VideoComponentProps {
  media: IMedia;
  maxHeight?: string;
}

export const VideoComponent: React.FC<VideoComponentProps> = ({
  media,
  maxHeight = "480px",
}) => {
  // console.log("media ====>", media);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const [videoSrc, setVideoSrc] = useState(
    `/api/video?videoUrl=${encodeURIComponent(media.video_versions[0].url)}`
  );
  const [fallbackImg, setFallbackImg] = useState("");
  const [isError, setIsError] = useState(false);
  const [videoVersionIndex, setVideoVersionIndex] = useState(0);

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const handleError = () => {
    if (media.video_versions[videoVersionIndex + 1]) {
      // Try the next video version
      setVideoVersionIndex(videoVersionIndex + 1);
      setVideoSrc(
        `/api/video?videoUrl=${encodeURIComponent(
          media.video_versions[videoVersionIndex + 1].url
        )}`
      );
    } else if (media.image_versions2[0]) {
      // No more video versions - use fallback image
      setIsError(true);
      setFallbackImg(media.image_versions2[0].url);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      videoRef.current.addEventListener("error", handleError);
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("error", handleError);
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoSrc, isError, videoVersionIndex]);

  if (isError) {
    console.log("isError ====>", isError);
    return (
      <Image
        src={fallbackImg}
        alt="Fallback Image"
        width={media.original_width}
        height={media.original_height}
        className={`rounded-lg`}
      />
    );
  }

  return (
    <div className={`relative rounded-lg`}>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="relative h-full"
            key={`stable-key-${media.video_versions[0].url}`}
            aria-controls={`stable-key-${media.video_versions[0].url}`}
          >
            <div className="flex">
              <div className="relative">
                <video
                  className="rounded-lg border"
                  style={{ maxHeight }}
                  ref={videoRef}
                  src={videoSrc}
                  muted={muted}
                  playsInline
                  loop
                />
                {media.has_audio && (
                  <button
                    onClick={handleMute}
                    className="absolute bottom-4 right-4 bg-zinc-500 bg-opacity-30 rounded-full p-1"
                  >
                    {muted ? <VolumeX /> : <Volume2 />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="h-screen">
          <video
            className={`h-screen m-auto`}
            src={videoSrc}
            muted={muted}
            playsInline
            loop
            autoPlay
          />
          {media.has_audio && (
            <button
              onClick={handleMute}
              className={`absolute bottom-4 right-4 bg-zinc-500 bg-opacity-30 rounded-full p-1 outline-none`}
            >
              {muted ? <VolumeX /> : <Volume2 />}
            </button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
