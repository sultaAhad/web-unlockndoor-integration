import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Aos from "aos";
import {
  useFaqsContentQuery,
  useHomeContentQuery,
} from "../network/services/HelpServices";

// ✅ Skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { mchat } from "../Constant/Index";

function MatchedProfileCard({ card, index }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4" key={index}>
      <div className="profile-card">
        <img
          src={card.profile_image_url}
          alt="profile"
          className="card-image"
        />

        <div className="card-bottom d-flex justify-content-between align-items-end">
          {/* Left: Icons */}
          <div className="card-left-icons d-flex align-items-center gap-2">
            <Link to="/chat" state={card} className="bottom-icon comment-icon">
              <img src={mchat} alt="chat" className="chat-image-icon" />
            </Link>
            <Link
              to="#"
              className="bottom-icon video-icon"
              onClick={(e) => {
                e.preventDefault();
                handlePricingShow();
              }}
            >
              <i className="fa-solid fa-video"></i>
            </Link>
          </div>

          {/* Right: View Profile */}
          <div className="card-right-actions text-end">
            <Link
              to={`/matched-Profiles/${card.id}`}
              className="view-profile-btn secondary-secondmedium-font"
            >
              View Profile
            </Link>
            <img
              src={card.profile_image_url}
              alt="thumb"
              className="profile-thumb"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchedProfileCard;
