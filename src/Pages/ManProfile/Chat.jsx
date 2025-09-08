import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // Import GSAP
import Modal from "react-bootstrap/Modal";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";
import {
	chatimg1,
	searchchat,
	chatimg2,
	chatimg3,
	chatimg4,
	chatimg5,
	camerachat,
	chatimgg,
	chatimgg1,
	paperclip,
	innerpages2,
} from "../../Constant/Index";
import PricingModal from "../../Components/ChatModals/PricingModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";
import ChatComponent from "../../Components/ChatComponent";

const Chat = () => {
	// Pricing Modal States
	const [showPricingModal, setShowPricingModal] = useState(false);
	const handlePricingClose = () => setShowPricingModal(false);
	const handlePricingShow = () => setShowPricingModal(true);

	// Pay Now Modal States
	const [showPayModal, setShowPayModal] = useState(false);
	const handlePayClose = () => setShowPayModal(false);
	const handlePayShow = () => setShowPayModal(true);

	// Thank you Modal States
	const [showThankModal, setShowThankModal] = useState(false);
	const handleThankClose = () => setShowThankModal(false);
	const handleThankShow = () => setShowThankModal(true);

	// Video chat Modal States
	const [showVideoChatModal, setShowVideoChatModal] = useState(false);
	const handleVideoChatClose = () => setShowVideoChatModal(false);
	const handleVideoChatShow = () => setShowVideoChatModal(true);

	// Video Play Modal States
	const [showVideoModal, setShowVideoModal] = useState(false);
	const handleVideoClose = () => setShowVideoModal(false);
	const handleVideoShow = () => setShowVideoModal(true);

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const fileInputRef = useRef(null);
	const [files, setFiles] = useState([]);

	const handleUploadClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		const mapped = selectedFiles.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
			type: file.type.startsWith("video") ? "video" : "image",
		}));
		setFiles((prev) => [...prev, ...mapped]);
	};

	const removeFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const toggleDropdown1 = () => {
		setDropdownOpen(!dropdownOpen);
	};

	// GSAP hover effect on dots
	const handleDotHover = () => {
		gsap.to(".dot-drop-down i", {
			scale: 1.5,
			rotation: 45,
			duration: 0.3,
			stagger: 0.1,
		});
	};

	const handleDotLeave = () => {
		gsap.to(".dot-drop-down i", {
			scale: 1,
			rotation: 0,
			duration: 0.3,
			stagger: 0.1,
		});
	};
	// chat user
	const users = [
		{
			id: 1,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "23h",
			img: chatimg1,
			active: true,
		},
		{
			id: 2,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "24h",
			img: chatimg2,
			active: false,
		},
		{
			id: 3,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "12/10",
			img: chatimg3,
			active: false,
		},
		{
			id: 4,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg4,
			active: false,
		},
		{
			id: 5,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg5,
			active: false,
		},
		{
			id: 6,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "12/10",
			img: chatimg1,
			active: false,
		},
		{
			id: 7,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg2,
			active: false,
		},
		{
			id: 8,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg4,
			active: false,
		},
	];

	const messages = [
		{
			id: 1,
			type: "outgoing", // Message type: "incoming" or "outgoing"
			user: "Jan Tschichold",
			time: "3:57 AM",
			date: "02/12/24",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			img: chatimg1,
		},
		{
			id: 2,
			type: "incoming",
			user: "Jan Tschichold",
			time: "3:57 AM",
			date: "Today",
			content: "Ut felis eros, blandit sed mattis sit.",
			img: chatimg1,
		},
		{
			id: 3,
			type: "outgoing",
			user: "Jan Tschichold",
			time: "3:57 AM",
			date: "Today",
			content: "Mauris sit amet ligula quis arcu efficitur laoreet.",
			img: chatimg1,
		},
		{
			id: 4,
			type: "incoming",
			content: "",
			img: chatimg1,
			attachment: chatimgg1, // Example for image content
			newclass: "bgtranspp",
		},
	];
	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages2})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";

		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);
	return (
		<>
			<Header />
			<section className="chat pt-5 mt-4 mb-4 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 ">
							<ChatComponent type={"men"} />
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Modal */}
			<PricingModal
				showPricingModal={showPricingModal}
				handlePricingClose={handlePricingClose}
				setShowPricingModal={setShowPricingModal}
				setShowPayModal={setShowPayModal}
			/>
			{/* Pricing Modal */}

			{/* Pay Now Modal */}
			<PayNowModal
				showPayModal={showPayModal}
				handlePayClose={handlePayClose}
				setShowThankModal={setShowThankModal}
				setShowPayModal={setShowPayModal}
			/>
			{/* Pay Now Modal */}

			{/* Thank You Now Modal */}
			<ThankYouModal
				showThankModal={showThankModal}
				handleThankClose={handleThankClose}
				setShowThankModal={setShowThankModal}
				setShowVideoChatModal={setShowVideoChatModal}
			/>
			{/* Thank You Now Modal */}

			{/* video chat Modal  */}
			<VideoChatModal
				handleVideoChatClose={handleVideoChatClose}
				showVideoChatModal={showVideoChatModal}
			/>
			{/* video chat Modal  */}
			<Footer />
		</>
	);
};

export default Chat;
