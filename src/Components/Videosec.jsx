import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { playbtn, videos, videpoimgwra } from "../Constant/Index";

function Videosec() {
	const controls = useAnimation();
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
	const [showModal, setShowModal] = useState(false);
	const videoRef = useRef(null);

	// Animate when in view
	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [inView, controls]);

	const animationVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
	};

	const openModal = () => {
		setShowModal(true);
		setTimeout(() => {
			if (videoRef.current) {
				videoRef.current.play();
			}
		}, 100);
	};

	const closeModal = () => {
		if (videoRef.current) {
			videoRef.current.pause();
		}
		setShowModal(false);
	};

	return (
		<>
			<motion.section
				className="video_sec"
				ref={ref}
				initial="hidden"
				animate={controls}
				variants={animationVariants}
			>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="video_dv position-relative">
								<img
									src={videpoimgwra}
									alt="video preview"
									className="img-fluid w-100 radius-8"
								/>
								<div
									className="video_icon"
									style={{
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										cursor: "pointer",
									}}
									onClick={openModal}
								>
									<div className="play-btn-wave">
										<img
											src={playbtn}
											alt="play button"
											className="img-fluid"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Modal */}
			{showModal && (
				<div
					className="video-modal"
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 9999,
					}}
					onClick={closeModal}
				>
					{/* Close Button */}
					<button
						onClick={closeModal}
						style={{
							position: "absolute",
							top: "20px",
							right: "30px",
							fontSize: "2rem",
							color: "#fff",
							background: "transparent",
							border: "none",
							cursor: "pointer",
							zIndex: 10000,
						}}
						aria-label="Close"
					>
						&times;
					</button>

					<video
						ref={videoRef}
						src={videos}
						controls
						style={{ width: "90%", maxWidth: "800px" }}
						onClick={(e) => e.stopPropagation()} // prevent closing modal on video click
					/>
				</div>
			)}
		</>
	);
}

export default Videosec;
