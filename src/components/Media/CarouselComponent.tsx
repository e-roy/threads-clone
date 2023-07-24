// components/Media/CarouselComponent.tsx

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { VideoComponent } from "./VideoComponent";

export const CarouselComponent: React.FC<{ carousel_media: any }> = ({
  carousel_media,
}) => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      useKeyboardArrows={true}
      swipeable={true}
      emulateTouch={true}
      showThumbs={false}
      showIndicators={false}
      className="carousel-container rounded-lg border-2"
    >
      {carousel_media.map((media: any) => (
        <div key={media.id} className="carousel-item">
          {media.video_versions.length > 0 ? (
            <VideoComponent source={media.video_versions} maxHeight={`420px`} />
          ) : (
            <div className="aspect-content">
              <Image
                src={media.image_versions2.candidates[0].url}
                alt={`carousel-${media.id}`}
                width={media.original_width}
                height={media.original_height}
                className="carousel-image"
              />
            </div>
          )}
        </div>
      ))}
    </Carousel>
  );
};
