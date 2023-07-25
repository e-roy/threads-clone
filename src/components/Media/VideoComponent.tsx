"use client";
// components/Media/VideoComponent.tsx

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface VideoComponentProps {
  source: any;
  maxHeight?: string;
  has_audio?: boolean;
}

export const VideoComponent: React.FC<VideoComponentProps> = ({
  source,
  maxHeight = "760px",
  has_audio = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const encodedSrc = `/api/video?videoUrl=${encodeURIComponent(source[0].url)}`;

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

    videoRef.current && observer.observe(videoRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      videoRef.current && observer.unobserve(videoRef.current);
    };
  }, []);

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  // TODO: error - Warning: Prop `aria-controls` did not match. Server: "radix-:R358mqdl6cq:" Client: "radix-:Rcl2r9mkpj9:" from Dialog component.

  return (
    <div className={`relative rounded-lg`}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative w-full h-full" key={`stable-key-${source}`}>
            <div className="flex justify-center">
              <div className="relative">
                <video
                  className="rounded-lg border-2"
                  style={{ maxHeight }}
                  ref={videoRef}
                  src={encodedSrc}
                  muted={muted}
                  playsInline
                  loop
                />
                {has_audio && (
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
            src={encodedSrc}
            muted={muted}
            playsInline
            loop
            autoPlay
          />
          {has_audio && (
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
