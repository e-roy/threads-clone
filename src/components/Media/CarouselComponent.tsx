// components/Media/CarouselComponent.tsx

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { VideoComponent } from "./VideoComponent";

export const CarouselComponent: React.FC<{ carousel_media: any }> = ({
  carousel_media,
}) => {
  const maxHeight = 330;

  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      useKeyboardArrows={true}
      swipeable={true}
      emulateTouch={true}
      showThumbs={false}
      showIndicators={false}
      centerMode={true}
      centerSlidePercentage={48}
      className="rounded-lg"
    >
      {carousel_media.map((media: any) => {
        return (
          <div key={media.id} className={`mx-1`}>
            {media.video_versions.length > 0 ? (
              <VideoComponent media={media} maxHeight={`${maxHeight}px`} />
            ) : (
              <div
                className={`m-0 p-0 flex justify-center object-cover rounded-lg border`}
                style={{ height: `${maxHeight}px` }}
              >
                <Image
                  src={media.image_versions2.candidates[0].url}
                  alt={`carousel-${media.id}`}
                  width={media.original_width}
                  height={media.original_height}
                  className={`rounded-lg`}
                />
              </div>
            )}
          </div>
        );
      })}
    </Carousel>
  );
};
