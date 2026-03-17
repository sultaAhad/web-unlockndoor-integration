import { useEffect, useRef, useState } from "react";
import {
	useGetChatMessagesQuery,
	useGetChatsQuery,
	useSendMessageMutation,
} from "../network/services/Chat";
import {
	camerachat,
	chatimg1,
	chatimgg,
	chatimgg1,
	paperclip,
	searchchat,
} from "../Constant/Index";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import VideoCallButton from "./VideoCallButton";
import { BASE_URL } from "../utils/base_url";
import { GET_CHAT_MESSAGES_API } from "../utils/endpoints";
import {
	useChatDeleteManMutation,
	useGetMatchedProfilesQuery,
} from "../network/services/ManAuth";
import { useChatDeleteWomenMutation } from "../network/services/WomanAuth";
import limit_text from "../utils/helper";

function ChatComponent({ type }) {
	const { user, userToken } = useSelector((state) => state.auth);
	const [showPriceModal, setShowPriceModal] = useState(false);

	const [deleteManChat] = useChatDeleteManMutation();
	const [deleteWomenChat] = useChatDeleteWomenMutation();

	const [chats, setChats] = useState([]);
	const [filteredChats, setFilteredChats] = useState([]);
	const [selectedChat, setSelectedChat] = useState({ chat_id: 0 });
	const [messages, setMessages] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isChatMessagesLoading, setIsChatMessagesLoading] = useState(false);
	const messagesEndRef = useRef(null);
	const location = useLocation();
	const dispatch = useDispatch();

	const canVideoCall = (() => {
		const packageSlug = selectedChat?.package_slug;
		if (!packageSlug) {
			console.log("No package_slug found for selected chat.");
			return false;
		}

		const fromPackage = (packageSlug.from_package || "").toLowerCase();
		const toPackage = (packageSlug.to_package || "").toLowerCase();

		const blockedKeywords = ["silver", "free-tier"];
		const allowedKeywords = ["gold", "platinum", "one-time-payment"];

		if (
			blockedKeywords.some(
				(keyword) =>
					fromPackage.includes(keyword) || toPackage.includes(keyword),
			)
		) {
			console.log("Video Call Blocked due to silver or free-tier package.");
			return false;
		}

		if (
			allowedKeywords.some(
				(keyword) =>
					fromPackage.includes(keyword) || toPackage.includes(keyword),
			)
		) {
			console.log("Video Call Allowed due to allowed package.");
			return true;
		}

		console.log("Video Call Not Allowed - package not in allowed list.");
		return false;
	})();

	useEffect(() => {
		if (location?.state != null) {
			setSelectedChat({
				chat_id: 0,
				newChat: true,
				participant_id: location?.state?.id,
				participant_name: location?.state?.name,
				participant_profile:
					location?.state?.profile_image_url || location?.state?.profileImage,
			});
			setForm((pre) => ({
				...pre,
				to_id: location?.state?.id,
			}));
		}
	}, [location?.state]);

	const handleDeleteChat = async () => {
		if (!selectedChat?.chat_id) {
			toast.warn("No chat selected!");
			return;
		}

		try {
			let response;
			if (user.gender === "men") {
				response = await deleteManChat({
					chat_id: selectedChat.chat_id,
				}).unwrap();
			} else {
				response = await deleteWomenChat({
					chat_id: selectedChat.chat_id,
				}).unwrap();
			}

			if (response?.status || response?.success) {
				toast.success("Chat deleted successfully!");
				setChats((prev) =>
					prev.filter((chat) => chat.chat_id !== selectedChat.chat_id),
				);
				setFilteredChats((prev) =>
					prev.filter((chat) => chat.chat_id !== selectedChat.chat_id),
				);
				setSelectedChat({ chat_id: 0 });
				setMessages([]);
			} else {
				toast.error("Failed to delete chat!");
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong while deleting the chat.");
		}
	};

	const toggleDropdown1 = () => setDropdownOpen(!dropdownOpen);

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

	const [form, setForm] = useState({
		type: type,
		to_id: 0,
		to_type: type === "women" ? "Men" : "Women",
		message: "",
		files: [],
	});

	// FIXED: Properly handle the API response
	const {
		data: chatsData,
		isLoading: isChatLoading,
		refetch,
	} = useGetChatsQuery(type, {
		refetchOnMountOrArgChange: true,
	});


	const getChatMessages = async () => {
		const token = localStorage.getItem("token");
		const response = await fetch(
			`${BASE_URL}${GET_CHAT_MESSAGES_API(type, selectedChat?.chat_id)}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			},
		);

		const data = await response.json();
		if (data?.chat) {
			let messages = data?.chat?.messages.map((message) =>
				formateMessage(message),
			);
			setMessages(messages);
		}
	};

	const [sendMessage, sendMessageResponse] = useSendMessageMutation();

	// FIXED: Properly handle the chats data with error checking
	useEffect(() => {
		if (chatsData?.status === true && chatsData?.chats) {
			setChats(chatsData.chats);
			setFilteredChats(chatsData.chats);
		} else if (chatsData?.status === false) {
			// Handle no chats found scenario
			setChats([]);
			setFilteredChats([]);
			console.log("No chats found:", chatsData.message);
		}
	}, [chatsData]);

	useEffect(() => {
		if (selectedChat?.chat_id != undefined && selectedChat?.chat_id > 0) {
			getChatMessages();
			refetch();
		}
	}, [selectedChat?.chat_id]);

	const sendMessageHandle = async () => {
		try {
			if (form.message.trim().length === 0 && form.files.length === 0) {
				toast.error("Neither text message nor any file to send to user");
				return;
			}

			const formData = new FormData();
			formData.append("type", form.type);
			formData.append("to_id", form.to_id.toString());
			formData.append("to_type", form.to_type);
			formData.append("message", form.message);

			form.files.forEach((fileObj, index) => {
				formData.append(`files[${index}]`, fileObj.file);
			});

			let response = await sendMessage({ formData, type }).unwrap();
			if (response.success) {
				setForm((pre) => ({
					...pre,
					message: "",
					files: [],
				}));
				scrollToBottom();
				refetch();
				setSelectedChat((pre) => ({
					...pre,
					chat_id: response.chat?.id,
				}));
			}
		} catch (error) {
			if (error.data?.message) {
				toast.error(error.data?.message);
				setForm((pre) => ({
					...pre,
					message: "",
					files: [],
				}));
			}
		}
	};

	const fileInputRef = useRef(null);

	const handleUploadClick = () => fileInputRef.current.click();

	const handleFileChange = async (e) => {
		const selectedFiles = Array.from(e.target.files);
		const mappedFiles = selectedFiles.map((file) => ({
			file: file,
			type: file.type.startsWith("video") ? "video" : "image",
			preview: URL.createObjectURL(file),
			name: file.name,
			size: file.size,
		}));

		setForm((prev) => ({
			...prev,
			files: [...prev.files, ...mappedFiles],
		}));

		e.target.value = "";
	};

	const removeFile = (index) => {
		if (form.files[index].preview) {
			URL.revokeObjectURL(form.files[index].preview);
		}

		setForm((prev) => ({
			...prev,
			files: prev.files.filter((_, i) => i !== index),
		}));
	};

	const formatDate = (dateString) => {
		if (!dateString) return "";
		try {
			const date = parseISO(dateString);
			if (isToday(date)) {
				return format(date, "h:mm a");
			} else if (isYesterday(date)) {
				return "Yesterday";
			} else {
				return format(date, "MMM d, yyyy");
			}
		} catch (e) {
			return dateString;
		}
	};

	useEffect(() => {
		if (!selectedChat?.chat_id) return;
		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			encrypted: true,
		});

		const channel = pusher.subscribe(`chat.${selectedChat.chat_id}`);
		channel.bind("message.sent", (data) => {
			const newMsg = data?.message;
			setMessages((prev) => [...prev, formateMessage(newMsg)]);
			refetch();

			setChats((prevChats) =>
				prevChats.map((chat) => {
					if (
						chat.chat_id !== selectedChat?.chat_id &&
						chat.chat_id === newMsg.chat_id
					) {
						return { ...chat, unread_count: (chat.unread_count || 0) + 1 };
					}
					return chat;
				}),
			);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
			pusher.disconnect();
		};
	}, [selectedChat?.chat_id]);

	useEffect(() => {
		return () => {
			form.files.forEach((file) => {
				if (file.preview) {
					URL.revokeObjectURL(file.preview);
				}
			});
		};
	}, [form.files]);

	const formateMessage = (message) => ({
		id: message.id || message.message_id,
		file_urls: message.file_urls,
		profile_image_url: message.profile_image_url,
		message: message.message,
		type: message.from_id === user.id ? "outgoing" : "incoming",
		time: formatDate(message.created_at),
		date: formatDate(message.created_at),
		attachments: message.file_urls,
	});

	const minutes = selectedChat?.minutes || 0;

	const handleChatSearch = (e) => {
		const { value } = e.target;
		if (!value.trim()) {
			setFilteredChats(chats);
			return;
		}
		const filtered = chats.filter((chat) =>
			chat.participant_name.toLowerCase().includes(value.toLowerCase()),
		);
		setFilteredChats(filtered);
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const setLimit = (message) => {
		if (message != null) {
			return `${message.substring(0, 25)}${message.length > 25 ? "..." : ""}`;
		}
		return "";
	};

	const Loader = () => (
		<div className="btn-loader spinner-border text-warning" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);

	const sendMessageFormHTML = () => {
		if (!selectedChat) return null;
		return (
			<div className="wrapper-member-pp wrapper-upload-chat">
				{form.files.length > 0 && (
					<div className="d-flex align-items-center gap-2 mb-2">
						{form.files.map((item, index) => (
							<div className="position-relative" key={index}>
								{item.type === "image" ? (
									<img
										src={item.preview}
										className="img-fluid "
										style={{
											width: "60px",
											height: "60px",
											borderRadius: "8px",
											objectFit: "cover",
											padding: "2px",
										}}
										alt={`Preview ${index}`}
									/>
								) : (
									<div style={{ position: "relative" }}>
										<img
											src={chatimgg}
											className="img-fluid"
											style={{
												width: "80px",
												height: "80px",
												borderRadius: "8px",
												objectFit: "cover",
											}}
											alt="Video Preview"
										/>
										<i
											className="fa-solid fa-play"
											style={{
												position: "absolute",
												top: "50%",
												left: "50%",
												transform: "translate(-50%, -50%)",
												fontSize: "1rem",
												color: "#fff",
											}}
										></i>
									</div>
								)}
								<div
									className="wrapper-x-mark-cancl"
									style={{
										cursor: "pointer",
										borderRadius: "50%",
									}}
									onClick={() => removeFile(index)}
								>
									<i
										className="fa-solid fa-xmark"
										style={{
											color: "#fff",
											fontSize: "0.8rem",
										}}
									></i>
								</div>
							</div>
						))}
					</div>
				)}
				<div className="d-flex align-items-center mt-1">
					<div className="input-group">
						<input
							type="text"
							name="message"
							value={form.message}
							onChange={(e) =>
								setForm((pre) => ({
									...pre,
									message: e.target.value,
								}))
							}
							className="form-control secondary-regular-font"
							placeholder="Type your Message"
							aria-label="Message"
						/>
					</div>
					<img
						src={paperclip}
						alt="Upload"
						className="img-fluid me-4"
						style={{
							width: "24px",
							height: "24px",
							cursor: "pointer",
						}}
						onClick={handleUploadClick}
					/>
					<input
						type="file"
						ref={fileInputRef}
						style={{ display: "none" }}
						accept="image/*,video/*"
						multiple
						onChange={handleFileChange}
					/>
					<button
						className="border text-center px-3 gradient-button"
						type="button"
						disabled={sendMessageResponse?.isLoading}
						onClick={sendMessageHandle}
					>
						{sendMessageResponse?.isLoading ? <Loader /> : "Send"}
					</button>
				</div>
			</div>
		);
	};

	const renderAttachments = (attachments) => {
		const getFileType = (url) => {
			const extension = url.split(".").pop().toLowerCase();
			if (["mp4", "mov", "avi", "webm", "ogg"].includes(extension))
				return "video";
			if (["webp", "webp", "jpeg", "gif", "webp", "bmp"].includes(extension))
				return "image";
			return "other";
		};

		return (
			<div
				className="attachments-container"
				style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
			>
				{attachments.map((attachment, index) => {
					const fileType = getFileType(attachment);

					switch (fileType) {
						case "video":
							return (
								<div key={index} className="attachment-video">
									<video
										controls
										style={{
											width: "100px",
											height: "100px",
											borderRadius: "8px",
											objectFit: "cover",
										}}
									>
										<source
											src={attachment}
											type={`video/${attachment.split(".").pop()}`}
										/>
										Your browser does not support the video tag.
									</video>
								</div>
							);

						case "image":
							return (
								<div key={index} className="attachment-image">
									<img
										src={attachment}
										alt={`Attachment ${index}`}
										style={{
											width: "100px",
											height: "100px",
											borderRadius: "8px",
											objectFit: "cover",
											cursor: "pointer",
										}}
										onClick={() => window.open(attachment, "_blank")}
									/>
								</div>
							);

						default:
							return (
								<div key={index} className="attachment-other">
									<a
										href={attachment}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											padding: "8px 12px",
											background: "#f0f0f0",
											borderRadius: "4px",
											textDecoration: "none",
											color: "#333",
											display: "inline-block",
										}}
									>
										📎 File {index + 1}
									</a>
								</div>
							);
					}
				})}
			</div>
		);
	};

	const chatsHTML = () => {
		if (isChatLoading) {
			return (
				<div className="col-md-12 py-5 text-center">
					<Loader />
				</div>
			);
		}

		// FIXED: Check if filteredChats is empty
		if (filteredChats.length === 0) {
			return (
				<p className="py-5 secondary-medium-font text-capitalize text-center text-white">
					No chats found
				</p>
			);
		}

		return (
			<ul className="p-0 wrapper-chat-b">
				{filteredChats.map((chat) => (
					<li
						key={chat.chat_id}
						onClick={() => {
							setSelectedChat(chat);
							setForm((pre) => ({
								...pre,
								to_id: chat.participant_id,
							}));
							setChats((prevChats) =>
								prevChats.map((c) =>
									c.chat_id === chat.chat_id ? { ...c, unread_count: 0 } : c,
								),
							);
						}}
						className={`d-flex align-items-start border-bottom justify-content-between py-3 px-3 
							${chat.chat_id == selectedChat?.chat_id ? "bg-massage" : ""}
							`}
					>
						<div className="d-flex align-items-center gap-3">
							<div className="wrapper-navigate-main1 position-relative">
								<img
									src={chat.participant_profile}
									className="img-fluid chat-users rounded-circle"
									alt={chat.participant_name}
								/>
								{chat.unread_count > 0 && (
									<span
										className="unread-badge"
										style={{
											position: "absolute",
											top: "-4px",
											right: "-2px",
											backgroundColor: "#ff4757",
											color: "#fff",
											fontSize: "10px",
											fontWeight: "600",
											borderRadius: "50%",
											minWidth: "18px",
											height: "18px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											boxShadow: "0 0 4px rgba(0,0,0,0.3)",
										}}
									>
										{chat.unread_count}
									</span>
								)}
							</div>

							<div>
								<div className="d-flex align-items-start gap-2">
									<h4 className="secondary-semibold-font mb-1 text-white level-8 text-capitalize">
										{limit_text(chat.participant_name)}
									</h4>
									<span
										className={chat.active ? "green active" : "green"}
									></span>
								</div>
								<p className="mb-0 level-8 extra-color-13 secondary-light-font">
									{setLimit(chat.last_message)}
								</p>
							</div>
						</div>
						{chat.last_message_time && (
							<h4 className="secondary-medium-font text-white level-8">
								{formatDate(chat.last_message_time)}
							</h4>
						)}
					</li>
				))}
			</ul>
		);
	};

	const selectedChatHTML = () => {
		if (!selectedChat) return null;
		return (
			<>
				<div className="col-md-6 selected_chat mb-md-0 mb-3">
					<div className="d-flex align-items-center gap-3">
						<img
							src={selectedChat?.participant_profile}
							className="img-fluid border-golder rounded-circle "
							alt="User"
						/>
						<h4 className="secondary-regular-font mb-0 text-white level-7 text-capitalize">
							{limit_text(selectedChat?.participant_name)}
						</h4>
					</div>
				</div>
				<div className="col-md-3">
					<div className="dot-drop-down chat-dot">
						{canVideoCall && (
							<div className="camera-link-ww">
								<div
									onClick={() => {
										const minutes =
											typeof selectedChat?.minutes === "object"
												? selectedChat?.minutes?.minutes || 0
												: selectedChat?.minutes || 0;

										if (minutes > 0) {
											console.log("Starting video call...");
											console.log(selectedChat?.minutes, "asdas");
											document.getElementById("videoCallButton")?.click();
										} else {
											console.log("Opening price modal...");
											setShowPriceModal(true);
										}
									}}
									style={{ cursor: "pointer" }}
								>
									<VideoCallButton
										id="videoCallButton"
										member={{
											id: selectedChat?.participant_id,
											name: selectedChat?.participant_name,
											profile_image_url: selectedChat?.participant_profile,
											gender: user.gender === "men" ? "women" : "men",
											minutes:
												typeof selectedChat?.minutes === "object"
													? selectedChat?.minutes?.minutes
													: selectedChat?.minutes,
										}}
										gender={user.gender}
										type="icon"
									/>
								</div>
							</div>
						)}

						<div
							className=" wrapper-dot d-flex align-items-center gap-1"
							type="button"
							onClick={toggleDropdown1}
							style={{ cursor: "pointer" }}
							onMouseEnter={handleDotHover}
							onMouseLeave={handleDotLeave}
						>
							<i className="fa-solid fa-circle-dot extra-color-8 level-12"></i>
							<i className="fa-solid fa-circle-dot extra-color-8 level-12"></i>
							<i className="fa-solid fa-circle-dot extra-color-8 level-12"></i>
						</div>
						{dropdownOpen && (
							<div className="dot-dropdown-menu chat-dropdown">
								<ul className="bg-dropdown-ul mt-3">
									<li
										className="d-flex p-2 gap-3 align-items-center"
										style={{ cursor: "pointer" }}
										onClick={() => {
											setDropdownOpen(false);
											handleDeleteChat();
										}}
									>
										<i className="fas fa-trash-alt level-8 extra-color-10"></i>
										<h4 className="secondary-regular-font mb-0 level-8 extra-color-10">
											Delete
										</h4>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<ToastContainer />
			<style>
				{`
					.selected_chat img {
						height: 55px;
						width: 55px;
						object-fit:cover;
					}
				`}
			</style>
			<div className="chat-wrapper">
				<div className="row">
					<div className="col-lg-4 mb-lg-0 mb-4">
						<div className="wrapper-member-pp wrapper-chat-input d-flex align-items-center gap-2">
							<img src={searchchat} className="img-fluid" alt="" />
							<div className="input-group ">
								<input
									type="text"
									onChange={handleChatSearch}
									className="form-control"
									placeholder="Search here...."
									aria-label="Search here...."
								/>
							</div>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="row align-items-center justify-content-between">
							{(selectedChat.newChat || selectedChat?.chat_id > 0) &&
								selectedChatHTML()}
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4">
						<div className="chat-user">{chatsHTML()}</div>
					</div>
					<div className="col-lg-8 mt-4">
						<div className="multichat1">
							<div className="multichat " ref={messagesEndRef}>
								{isChatMessagesLoading ? (
									<div className="col-md-12 py-5 text-center">
										<Loader />
									</div>
								) : (
									<>
										{messages.length > 0 ? (
											[...messages].reverse().map((message, index) => (
												<div key={message.id || index}>
													<div
														className={`${message.type}-massage d-flex align-items-center gap-3 mt-3 mb-3`}
													>
														{message.type === "incoming" && (
															<img
																src={message.profile_image_url}
																className="img-fluid chat-users rounded-circle"
																alt={`User ${index + 1}`}
															/>
														)}
														<div
															className={`bg-massage bg-${message.type} ${
																message.newclass || ""
															}`}
														>
															<div className="d-flex align-items-center justify-content-between">
																<h5 className="secondary-medium-font mb-2 mt-2 text-white level-8"></h5>
																<h4 className="secondary-regular-font mb-0 extra-color-13 level-8">
																	{message.time}
																</h4>
															</div>
															{message.message && (
																<p className="mb-0 extra-color-13 secondary-light-font">
																	{message.message}
																</p>
															)}
															{message.attachments &&
																message.attachments.length > 0 &&
																renderAttachments(message.attachments)}
														</div>
														{message.type === "outgoing" && (
															<img
																src={message.profile_image_url}
																className="img-fluid chat-users rounded-circle"
																alt={`User ${index + 1}`}
															/>
														)}
													</div>
												</div>
											))
										) : (
											<p className="py-5 text-capitalize text-center text-secondary">
												Send message to start chat
											</p>
										)}
									</>
								)}
							</div>

							{(selectedChat.newChat || selectedChat?.chat_id > 0) &&
								sendMessageFormHTML()}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ChatComponent;
