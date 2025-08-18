import React from "react";
import Slider from "react-slick";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGalleryContentQuery } from "../network/services/GalleryApi";

function Peopleimg() {
  const { data, isLoading, isError } = useGalleryContentQuery();

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    speed: 700,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="people_img-sec relative">
      <div className="slider-container relative overflow-hidden px-4">
        {/* Shadows */}
        <div className="left-shadow" />
        <div className="right-shadow" />
        <div className="top-shadow" />
        <div className="bottom-shadow" />

        {isLoading ? (
          // Skeleton loader
          <div className="flex gap-4 justify-center">
            {[...Array(3)].map((_, i) => (
              <SkeletonTheme
                key={i}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              >
                <Skeleton width={250} height={300} borderRadius={12} />
              </SkeletonTheme>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load gallery.</p>
        ) : (
          <Slider {...settings}>
            {data?.response?.data?.map((item, index) => (
              <div key={index} className="px-2">
                <div className="img_wrapper">
                  {item?.image_url?.endsWith(".mp4") ? (
                    <video
                      src={item.image_url}
                      controls
                      className="img-slide transition-all duration-700 ease-in-out"
                    />
                  ) : (
                    <img
                      src={item.image_url}
                      alt={`people-${index}`}
                      className="img-slide transition-all duration-700 ease-in-out"
                    />
                  )}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default Peopleimg;
