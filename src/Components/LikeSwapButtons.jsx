import React, { useEffect, useState } from "react";
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
import { useLikeProfileMutation } from "../network/services/WomanAuth";
import { toast } from "react-toastify";

function LikeSwapButtons({ type, femaleMember, responseAction }) {
  const [actionType, setActionType] = useState("like");
  const [likeProfile, { isLoading: isLikeProfileLoading }] =
    useLikeProfileMutation();
  const profileAction = async (member_id, type) => {
    try {
      setActionType(type);
      const response =
        type == "like"
          ? await likeProfile({ liked_id: member_id }).unwrap()
          : await likeProfile({ liked_id: member_id }).unwrap();

      //   setFemaleMember((pre) => ({
      //     ...pre,
      //     likes_count: response.likes_count,
      //     is_liked: response.is_liked,
      //   }));

      responseAction({
        type: type,
        likes_count: response.likes_count,
        is_liked: response.is_liked,
      });
      toast.success(response?.data?.message);
      setActionType("like");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const Loader = () => (
    <div className="btn-loader spinner-border text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  if (type == "like") {
    return (
      <div
        className="icon-circle linear-bg"
        onClick={() => profileAction(femaleMember.id, "like")}
      >
        {isLikeProfileLoading && actionType === "like" ? (
          <Loader />
        ) : (
          <i
            className={`fa-solid fa-heart ${
              femaleMember?.is_liked ? "text-danger" : ""
            }`}
          ></i>
        )}
      </div>
    );
  }
  if (type == "swap") {
    return (
      <div
        className="icon-circle"
        onClick={() => profileAction(femaleMember.id, "swap")}
      >
        {isLikeProfileLoading && actionType === "swap" ? (
          <Loader />
        ) : (
          <i className="fa-solid fa-xmark close-icon"></i>
        )}
      </div>
    );
  }
}

export default LikeSwapButtons;
