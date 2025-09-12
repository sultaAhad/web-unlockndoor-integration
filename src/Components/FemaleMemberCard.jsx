import { Link, useNavigate } from "react-router-dom";
import { like, mchat } from "../Constant/Index";
import { useEffect, useState } from "react";
import OfferModal from "../Pages/ManProfile/OfferModal";
import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import ThankYouModal from "./ChatModals/ThankYouModal";
import VideoChatModal from "./ChatModals/videoChatModal";
import { useLikeProfileMutation } from "../network/services/WomanAuth";
import { toast } from "react-toastify";
import LikeSwapButtons from "./LikeSwapButtons";
import VideoCallButton from "./VideoCallButton";
import MakeOfferButton from "./MakeOfferButton";

const FemaleMemberCard = ({ member, memberId }) => {
  const packageTitle = member?.package?.slug
    ?.replace("-package", "")
    .toUpperCase();

  const [femaleMember, setFemaleMember] = useState(member);

  const checkFeatureAccess = (member, feature) => {
    const pkg = member?.package?.slug || "";
    if (!pkg) return false;

    if (pkg.includes("silver")) {
      return feature === "chat";
    }
    if (pkg.includes("gold")) {
      return feature === "chat" || feature === "video";
    }
    if (pkg.includes("platinum")) {
      return true;
    }
    return false;
  };
  const navigate = useNavigate();

  const handleClick = (member) => {
    navigate(`/women-details/${member.id}`, { state: { member } });
  };

  return (
    <>
      <div key={memberId} className="col-lg-4 col-md-6 mb-4">
        <div className="profile-card">
          <span className={`card-badge ${packageTitle.toLowerCase()}`}>
            {packageTitle}
          </span>
          <div className="card-icons">
            {checkFeatureAccess(femaleMember, "chat") && (
              <div className="icon-circle iconwra1">
                <Link to={`/chat`} state={femaleMember}>
                  <img src={mchat} alt="chat" />
                </Link>
              </div>
            )}

            {checkFeatureAccess(femaleMember, "video") && (
              <div className="icon-circle iconwra2">
                <VideoCallButton member={femaleMember} />
              </div>
            )}

            {checkFeatureAccess(femaleMember, "offer") && (
              <MakeOfferButton member={femaleMember} />
            )}
          </div>

          <img
            src={femaleMember.profile_image_url}
            alt="profile"
            className="card-image"
          />

          <div className="play-button">
            <i className="fa-solid fa-play"></i>
          </div>

          <div
            className="card-footer"
            onClick={() => handleClick(femaleMember)}
            style={{ cursor: "pointer" }}
          >
            <h4>{femaleMember.name}</h4>
            <p>{femaleMember.nationality || femaleMember.address}</p>
          </div>

          <div className="card-actions">
            <div>
              <span className="like-count me-0 ms-1">
                {femaleMember.likes_count ?? 0}
              </span>
              <div className="wrapper-dash">
                <LikeSwapButtons
                  type={"like"}
                  femaleMember={femaleMember}
                  responseAction={(response) => {
                    setFemaleMember((pre) => ({
                      ...pre,
                      likes_count: response.likes_count,
                      is_liked: response.is_liked,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="wrapper-dash">
              <LikeSwapButtons
                type={"swap"}
                femaleMember={femaleMember}
                responseAction={(response) => {
                  setFemaleMember((pre) => ({
                    ...pre,
                    likes_count: response.likes_count,
                    is_liked: response.is_liked,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FemaleMemberCard;
