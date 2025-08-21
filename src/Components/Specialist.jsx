import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { outline1, outline2 } from "../Constant/Index";
import { useHomeContentQuery } from "../network/services/HelpServices";

function Specialist() {
  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const containerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  // Fetch content
  const { data: homePageContent, isLoading } = useHomeContentQuery();
  const HomePageData = homePageContent?.data?.sectionSix;

  // Split subtitle into first word + rest
  const firstWord = HomePageData?.page_subtitle?.split(" ")[0] || "";
  const restText =
    HomePageData?.page_subtitle?.replace(firstWord, "") || "";

  return (
    <motion.section
      className="specialist_Sec"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* Text Content */}
            <motion.div className="dv_wrapper" variants={containerVariant}>
              <motion.div className="text_wrapper" variants={textVariant}>
                {/* Heading */}
                {isLoading ? (
                  <Skeleton height={40} width={350} />
                ) : (
                  <motion.h2 variants={textVariant}>
                    {firstWord}{" "}
                    <span className="gradient-text">{restText}</span>
                  </motion.h2>
                )}

                {/* Content (safe render) */}
                {isLoading ? (
                  <Skeleton count={3} />
                ) : HomePageData?.content ? (
                  <motion.div
                    variants={textVariant}
                    dangerouslySetInnerHTML={{ __html: HomePageData.content }}
                  />
                ) : (
                  <Skeleton count={3} />
                )}
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="lets_img text-center"
              variants={textVariant}
            >
              <div className="button_width">
                {isLoading ? (
                  <Skeleton height={25} width={100} />
                ) : (
                  <motion.h4 variants={textVariant}>Join Now</motion.h4>
                )}

                <Link
                  to="/man-registration"
                  className="btn-bgtransparent under-line me-2"
                >
                  <span className="pe-2">
                    <img src={outline1} alt="outline1" />
                  </span>
                  Men
                </Link>
                <Link
                  to="/women-registration"
                  className="border d-flex align-items-center"
                >
                  <span>
                    <img src={outline2} alt="outline2" />
                  </span>
                  Women
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Specialist;
