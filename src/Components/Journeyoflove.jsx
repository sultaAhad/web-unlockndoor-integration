import React, { useRef } from "react";
import Slider from "react-slick";
import { outline1, outline2 } from "../Constant/Index";
import { Link } from "react-router-dom";
import { useHomeContentQuery } from "../network/services/HelpServices";

function Journeyoflove() {
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const { data: homePageContent, isLoading } = useHomeContentQuery();
  const HomePageData = homePageContent?.data?.sectionTwo;
  console.log(homePageContent)

  const handlePause = () => sliderRef.current?.slickPause();
  const handlePlay = () => sliderRef.current?.slickPlay();

  return (
    <section className="banner_sec pb-0 mt-5 pt-3" id="about-section">
      <div className="container-fluid p-0">
        <div className="row align-items-center">
          {/* Left Image */}
          <div className="col-md-6">
            {isLoading ? (
              <div className="skeleton skeleton-img w-100 h-100"></div>
            ) : (
              <div className="girl_img_wrapper">
                <img
                  src={HomePageData?.image_url}
                  alt="section-two"
                  className="img-fluid"
                />
              </div>
            )}
          </div>

          {/* Right Slider */}
          <div className="col-md-6">
            <div
              className="wrapper p-lg-3 p-md-5"
              onMouseEnter={handlePause}
              onMouseLeave={handlePlay}
              onTouchStart={handlePause}
              onTouchEnd={handlePlay}
            >
              {isLoading ? (
                <div>
                  <div className="skeleton skeleton-title mb-3"></div>
                  <div className="skeleton skeleton-text mb-2"></div>
                  <div className="skeleton skeleton-text mb-2"></div>
                  <div className="skeleton skeleton-btn"></div>
                </div>
              ) : (
                <Slider ref={sliderRef} {...sliderSettings}>
                  {/* Slide 1 */}
                  <div className="text_wrapper">
                    <h5>{HomePageData?.page_subtitle}</h5>
                    <h2>
                      <span className="gradient-text">
                        {HomePageData?.subtitle_1?.split(" ")[0]}
                      </span>{" "}
                      {HomePageData?.subtitle_1?.replace(
                        HomePageData?.subtitle_1?.split(" ")[0],
                        ""
                      )}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{ __html: HomePageData?.content }}
                    />
                    <div className="button_width">
                      <h4>Join Now</h4>
                      <Link
                        to="/man-registration"
                        className="btn-bgtransparent under-line me-2"
                      >
                        <span className="pe-2">
                          <img src={outline1} alt="outline1" />
                        </span>
                        men
                      </Link>
                      <Link
                        to="/women-registration"
                        className="border d-flex align-items-center"
                      >
                        <span>
                          <img src={outline2} alt="outline2" />
                        </span>
                        women
                      </Link>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="text_wrapper">
                    <h2 className="gradient-text">{HomePageData?.subtitle_2}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: HomePageData?.content_2,
                      }}
                    />
                    <div className="button_width">
                      <h4>Join Now</h4>
                      <Link
                        to="/man-registration"
                        className="btn-bgtransparent under-line me-2"
                      >
                        <span className="pe-2">
                          <img src={outline1} alt="outline1" />
                        </span>
                        men
                      </Link>
                      <Link
                        to="/women-registration"
                        className="border d-flex align-items-center"
                      >
                        <span>
                          <img src={outline2} alt="outline2" />
                        </span>
                        women
                      </Link>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div className="text_wrapper what-sets-us-apart">
                    <h2 className="gradient-text mb-2">
                      {HomePageData?.subtitle_3}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: HomePageData?.content_3,
                      }}
                    />
                    <div className="button_width">
                      <h4>Join Now</h4>
                      <Link
                        to="/man-registration"
                        className="btn-bgtransparent under-line me-2"
                      >
                        <span className="pe-2">
                          <img src={outline1} alt="outline1" />
                        </span>
                        men
                      </Link>
                      <Link
                        to="/women-registration"
                        className="border d-flex align-items-center"
                      >
                        <span>
                          <img src={outline2} alt="outline2" />
                        </span>
                        women
                      </Link>
                    </div>
                  </div>
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journeyoflove;
