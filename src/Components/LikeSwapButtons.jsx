// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import Aos from "aos";
// import {
//   useFaqsContentQuery,
//   useHomeContentQuery,
// } from "../network/services/HelpServices";

// // ✅ Skeleton loader
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { useLikeProfileMutation } from "../network/services/WomanAuth";
// import { toast } from "react-toastify";

// function LikeSwapButtons({ type, femaleMember, responseAction }) {
//   const [actionType, setActionType] = useState("like");
//   const [likeProfile, { isLoading: isLikeProfileLoading }] =
//     useLikeProfileMutation();
//   const profileAction = async (member_id, type) => {
//     try {
//       setActionType(type);
//       const response =
//         type == "like"
//           ? await likeProfile({ liked_id: member_id }).unwrap()
//           : await likeProfile({ liked_id: member_id }).unwrap();

//       //   setFemaleMember((pre) => ({
//       //     ...pre,
//       //     likes_count: response.likes_count,
//       //     is_liked: response.is_liked,
//       //   }));

//       responseAction({
//         type: type,
//         likes_count: response.likes_count,
//         is_liked: response.is_liked,
//       });
//       toast.success(response?.data?.message);
//       setActionType("like");
//     } catch (error) {
//       toast.error(error?.data?.message);
//     }
//   };

//   const Loader = () => (
//     <div className="btn-loader spinner-border text-warning" role="status">
//       <span className="visually-hidden">Loading...</span>
//     </div>
//   );

//   if (type == "like") {
//     return (
//       // <div
//       //   className="icon-circle linear-bg"
//       // onClick={() => profileAction(femaleMember.id, "like")}
//       // >
//       //   {isLikeProfileLoading && actionType === "like" ? (
//       //     <Loader />
//       //   ) : (
//       //     <i
//       //       className={`fa-solid fa-heart ${
//       //         femaleMember?.is_liked ? "text-danger" : ""
//       //       }`}
//       //     ></i>
//       //   )}
//       // </div>
//       <div
//         className={`icon-circle  ${femaleMember?.is_liked ? "linear-bg" : ""}`}
//         onClick={() => profileAction(femaleMember.id, "like")}
//       >
//         {isLikeProfileLoading && actionType === "like" ? (
//           <Loader />
//         ) : (
//           <i className="fa-solid fa-heart"></i>
//         )}
//       </div>
//     );
//   }
//   if (type == "swap") {
//     return (
//       <div
//         className="icon-circle"
//         onClick={() => profileAction(femaleMember.id, "swap")}
//       >
//         {isLikeProfileLoading && actionType === "swap" ? (
//           <Loader />
//         ) : (
//           <i className="fa-solid fa-xmark close-icon"></i>
//         )}
//       </div>
//     );
//   }
// }

// export default LikeSwapButtons;

import React, { useState } from "react";
import { useLikeProfileMutation } from "../network/services/WomanAuth";
import { toast } from "react-toastify";
import { useGetManDataQuery } from "../network/services/ManAuth";

function LikeSwapButtons({ type, femaleMember, responseAction }) {
	const [actionType, setActionType] = useState("like");
	const [likeProfile, { isLoading: isLikeProfileLoading }] =
		useLikeProfileMutation();

	const { data: manData } = useGetManDataQuery();
	const manPackage = manData?.response?.data?.data?.package;
	const isManPaid = manPackage?.is_paid === 1;

	// ✅ Main like/swap action
	const profileAction = async (member_id, type) => {
		try {
			setActionType(type);

			const response = await likeProfile({ liked_id: member_id }).unwrap();

			responseAction({
				type,
				likes_count: response.likes_count,
				is_liked: response.is_liked,
				statusCode: response.statusCode,
			});

			// ✅ Show short success toast only once
			toast.success("Liked ❤️");
			setActionType("like");
		} catch (error) {
			const statusCode = error?.data?.statusCode;
			const errorMsg = error?.data?.message;

			if (statusCode === 403) {
				toast.error(
					"🚫 Daily like limit (10) reached. Upgrade for unlimited likes!",
				);
				return;
			}

			if (isManPaid) {
				// Optional: no need to show "unlimited" toast on every click
				console.log("Paid user — no limit");
			}

			toast.error(errorMsg || "Something went wrong!");
		}
	};

	// ✅ Loader
	const Loader = () => (
		<div className="btn-loader spinner-border text-warning" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);

	// ✅ Like Button
	if (type === "like") {
		return (
			<div
				className={`icon-circle ${femaleMember?.is_liked ? "linear-bg" : ""}`}
				onClick={() => profileAction(femaleMember.id, "like")}
				style={{ cursor: "pointer" }}
			>
				{isLikeProfileLoading && actionType === "like" ? (
					<Loader />
				) : (
					<i className="fa-solid fa-heart"></i>
				)}
			</div>
		);
	}

	// ✅ Swap Button
	if (type === "swap") {
		return (
			<div
				className="icon-circle"
				onClick={() => profileAction(femaleMember.id, "swap")}
				style={{ cursor: "pointer" }}
			>
				{isLikeProfileLoading && actionType === "swap" ? (
					<Loader />
				) : (
					<i className="fa-solid fa-xmark close-icon"></i>
				)}
			</div>
		);
	}

	return null;
}

export default LikeSwapButtons;

// import React, { useState } from "react";
// import { useLikeProfileMutation } from "../network/services/WomanAuth";
// import {
// 	useSwapWomenMutation,
// 	useGetManDataQuery,
// } from "../network/services/ManAuth";
// import { toast } from "react-toastify";

// function LikeSwapButtons({ type, femaleMember, responseAction }) {
// 	const [actionType, setActionType] = useState(null);

// 	const [likeProfile, { isLoading: isLikeLoading }] = useLikeProfileMutation();
// 	const [swapProfile, { isLoading: isSwapLoading }] = useSwapWomenMutation();

// 	const { data: manData } = useGetManDataQuery();
// 	const manPackage = manData?.response?.data?.data?.package;
// 	const isManPaid = manPackage?.is_paid === 1;

// 	const Loader = () => (
// 		<div className="btn-loader spinner-border text-warning" role="status">
// 			<span className="visually-hidden">Loading...</span>
// 		</div>
// 	);

// 	const profileAction = async (member_id, action) => {
// 		try {
// 			setActionType(action);

// 			let res;

// 			if (action === "swap") {
// 				res = await swapProfile({ swappee_id: member_id }).unwrap();
// 				toast.success("Profile Swapped 🔁");

// 				// ✅ Save in LocalStorage
// 				const swapped =
// 					JSON.parse(localStorage.getItem("swapped_members")) || [];
// 				if (!swapped.includes(member_id)) {
// 					swapped.push(member_id);
// 					localStorage.setItem("swapped_members", JSON.stringify(swapped));
// 				}

// 				// ✅ Instant UI update without reload
// 				responseAction({
// 					is_swapped: true,
// 					likes_count: res?.likes_count,
// 					is_liked: res?.is_liked,
// 				});
// 			} else {
// 				res = await likeProfile({ liked_id: member_id }).unwrap();

// 				if (res?.is_liked) toast.success("Profile Liked ❤️");
// 				else toast.info("Profile Disliked 💔");

// 				responseAction({
// 					is_liked: res?.is_liked,
// 					likes_count: res?.likes_count,
// 				});
// 			}

// 			setActionType(null);
// 		} catch (error) {
// 			const status = error?.data?.statusCode;

// 			if (status === 403 && !isManPaid) {
// 				toast.error("🚫 Daily Like Limit Reached! Upgrade to continue ❤️🔥");
// 				return;
// 			}

// 			toast.error(error?.data?.message || "Something went wrong!");
// 			setActionType(null);
// 		}
// 	};

// 	if (type === "like") {
// 		return (
// 			<div
// 				className={`icon-circle ${femaleMember?.is_liked ? "linear-bg" : ""}`}
// 				onClick={() => profileAction(femaleMember.id, "like")}
// 				style={{ cursor: "pointer" }}
// 			>
// 				{isLikeLoading && actionType === "like" ? (
// 					<Loader />
// 				) : (
// 					<i className="fa-solid fa-heart"></i>
// 				)}
// 			</div>
// 		);
// 	}

// 	if (type === "swap") {
// 		return (
// 			<div
// 				className="icon-circle"
// 				onClick={() => profileAction(femaleMember.id, "swap")}
// 				style={{ cursor: "pointer" }}
// 			>
// 				{isSwapLoading && actionType === "swap" ? (
// 					<Loader />
// 				) : (
// 					<i className="fa-solid fa-xmark close-icon"></i>
// 				)}
// 			</div>
// 		);
// 	}

// 	return null;
// }

// export default LikeSwapButtons;
