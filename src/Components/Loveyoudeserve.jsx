import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { outline1, outline2, wrapperfight } from "../Constant/Index";
import { Link } from "react-router-dom";
import { useHomeContentQuery } from "../network/services/HelpServices";

function Loveyoudeserve() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // Parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -150]);

  const { data: homePageContent, isLoading } = useHomeContentQuery();
  const HomePageData = homePageContent?.data?.sectionThree;

  // Prepare cards dynamically
  const cards = [
    { title: HomePageData?.subtitle_2, text: HomePageData?.content, num: "01" },
    { title: HomePageData?.subtitle_3, text: HomePageData?.content_2, num: "02" },
    { title: HomePageData?.subtitle_4, text: HomePageData?.content_3, num: "03" },
    { title: HomePageData?.subtitle_5, text: HomePageData?.content_4, num: "04" },
    { title: HomePageData?.subtitle_6, text: HomePageData?.content_5, num: "05" },
  ];

  return (
    <motion.section
      ref={ref}
      className="love_you_deserve_sec"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        backgroundPositionY: y,
      }}
    >
      <div className="container">
        <div className="love_sec_head">
          <h5>{HomePageData?.page_subtitle}</h5>
          <h2>
            {HomePageData?.subtitle_1?.split(" ")[0]}{" "}
            <span className="gradient-text">
              {HomePageData?.subtitle_1?.replace(
                HomePageData?.subtitle_1?.split(" ")[0],
                ""
              )}
            </span>
          </h2>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="dv_wrapper">
              <div className="dv_img_wrapper">
                {/* Dynamic Cards */}
                {isLoading ? (
                  <div className="skeleton skeleton-cards"></div>
                ) : (
                  cards.map(
                    (item, idx) =>
                      item?.title && (
                        <div key={idx} className={`love_head love_head_${idx + 1}`}>
                          {idx === 4 ? (
                            // last card has diff structure
                            <>
                              <div className={`love_number love_number_${idx + 1}`}>
                                <h1>{item.num}</h1>
                              </div>
                              <div className="leeddd">
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <h3>{item.title}</h3>
                              <p>{item.text}</p>
                              <div className={`love_number love_number_${idx + 1}`}>
                                <h1>{item.num}</h1>
                              </div>
                            </>
                          )}
                        </div>
                      )
                  )
                )}

                <img src={wrapperfight} alt="steps" />
              </div>

              <div className="lets_img text-center mt-2 pt-2">
                <h3>Let’s do this together…</h3>
                <div className="button_width mt-4">
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
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Loveyoudeserve;
