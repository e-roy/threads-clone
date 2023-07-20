"use client";
// components/Media/VideoComponent.tsx

import React, { useEffect, useRef } from "react";

export const VideoComponent: React.FC<{ source: any }> = ({ source }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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
      videoRef.current && observer.unobserve(videoRef.current);
    };
  }, []);
  return (
    <div className={`rounded-lg border-2`}>
      <video
        className={`rounded-lg`}
        ref={videoRef}
        src={encodedSrc}
        muted
        playsInline
        loop
      ></video>
    </div>
  );
};
