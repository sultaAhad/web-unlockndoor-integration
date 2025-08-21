import React from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Vector } from "../Constant/Index";
import { useTestemonialContentQuery } from "../network/services/HelpServices";

function Webslider() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  // API
  const { data, isLoading } = useTestemonialContentQuery();
  const testemonialData = data?.response?.data ?? [];

  return (
    <div className="slider-dv">
      <div className="slider-container">
        {isLoading ? (
          // Skeleton Loader
          <div className="slide-img">
            <div className="slide_text">
              <Skeleton circle width={50} height={50} />
              <p>
                <Skeleton count={3} />
              </p>
              <div className="slider_border"></div>
              <h4>
                <Skeleton width={120} />
              </h4>
            </div>
          </div>
        ) : (
          <Slider {...settings}>
            {testemonialData.map((item) => (
              <div className="slide-img" key={item.id}>
                <div className="slide_text">
                  <img src={Vector} alt="quote" />
                  <p>“{item.description}”</p>
                  <div className="slider_border"></div>
                  <h4>
                    — {item.name}
                    {item.city && `, ${item.city}`}
                  </h4>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default Webslider;
