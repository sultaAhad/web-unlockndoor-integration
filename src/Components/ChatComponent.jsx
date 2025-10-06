import { useEffect, useRef, useState } from "react";
import {
  useGetChatMessagesQuery,
  useGetChatsQuery,
  useSendMessageMutation,
  // useGetMessagesQuery,
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
import { useSelector } from "react-redux";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { toast, ToastContainer } from "react-toastify";

function ChatComponent({ type }) {
  const { user, userToken } = useSelector((state) => state.auth);

  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location?.state != null) {
      setSelectedChat({
        chat_id: 0,
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

  const { data, isLoading: isChatLoading, refetch } = useGetChatsQuery(type);
  const {
    data: messagesData,
    isLoading: isChatMessagesLoading,
    refetch: refetchMessages,
  } = useGetChatMessagesQuery({
    type: type,
    chat_id: selectedChat?.chat_id,
  });
  const [sendMessage, sendMessageResponse] = useSendMessageMutation();

  useEffect(() => {
    if (data?.chats) {
      setChats(data.chats);
      setFilteredChats(data.chats);
    }
  }, [data]);

  useEffect(() => {
    if (messagesData?.chat) {
      let messages = messagesData?.chat?.messages.map((message) =>
        formateMessage(message)
      );
      setMessages(messages);
    }
  }, [messagesData]);

  useEffect(() => {
    if (selectedChat?.chat_id != undefined && selectedChat?.chat_id > 0) {
      refetchMessages();
    }
  }, [selectedChat?.chat_id, refetchMessages]);

  const sendMessageHandle = async () => {
    try {
      let sendForm = { ...form };
      if (form.files.length > 0) {
        console.log(form.files);

        sendForm.files = form.files.map((file) => file.file);
      }
      let response = await sendMessage(sendForm).unwrap();
      if (response.success) {
        // setMessages((pre) => [...pre, formateMessage(response.message)]);
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
    const mapped = await Promise.all(
      selectedFiles.map(async (file) => {
        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        const base64 = await toBase64(file);
        return {
          file: base64,
          type: file.type.startsWith("video") ? "video" : "image",
        };
      })
    );
    setForm((prev) => ({ ...prev, files: [...prev.files, ...mapped] }));
  };

  const removeFile = (index) => {
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
      // authEndpoint: `${import.meta.env.VITE_APP_API_URL}/broadcasting/auth`,
      // auth: {
      //   headers: {
      //     Authorization: `Bearer ${userToken}`,
      //     Accept: "application/json",
      //   },
      // },
    });

    const channel = pusher.subscribe(`chat.${selectedChat.chat_id}`);
    channel.bind("message.sent", (data) => {
      setMessages((prev) => [...prev, formateMessage(data?.message)]);
      refetch();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [selectedChat?.chat_id]);

  const formateMessage = (message) => ({
    id: message.id || message.message_id,
    file_urls: message.file_urls,
    profile_image_url: message.profile_image_url,
    message: message.message,
    type: message.from_id === user.id ? "outgoing" : "incoming",
    time: formatDate(message.created_at),
    date: formatDate(message.created_at),
    attachment: message.file_urls?.[0] || null,
  });

  // const searchChat = (event) => {
  //   const { value } = event.target;
  //   let rowChats = chats.map((chat) => chat.participant_name);

  //   console.log(value);
  // };

  const handleChatSearch = (e) => {
    const { value } = e.target;
    if (!value.trim()) {
      setFilteredChats(chats);
      return;
    }
    const filtered = chats.filter((chat) =>
      chat.participant_name.toLowerCase().includes(value.toLowerCase())
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
                    src={item.file}
                    className="img-fluid "
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      padding: "2px",
                    }}
                    alt=""
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
  const chatsHTML = () => {
    if (isChatLoading) {
      return (
        <div className="col-md-12 py-5 text-center">
          <Loader />
        </div>
      );
    }

    return (
      <ul className="p-0 wrapper-chat-b">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <li
              key={chat.chat_id}
              onClick={() => {
                setSelectedChat(chat);
                setForm((pre) => ({
                  ...pre,
                  to_id: chat.participant_id,
                }));
              }}
              className={`d-flex align-items-start border-bottom justify-content-between py-3 px-3 
                ${chat.chat_id == selectedChat?.chat_id ? "bg-massage" : ""}
                `}
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={chat.participant_profile}
                  className="img-fluid chat-users rounded-circle"
                  alt={chat.participant_name}
                />
                <div>
                  <div className="d-flex align-items-start gap-2">
                    <h4 className="secondary-semibold-font mb-1 text-white level-8 text-capitalize">
                      {chat.participant_name}
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
          ))
        ) : (
          <p className="py-5 text-capitalize text-center text-secondary">
            No Chat found
          </p>
        )}
      </ul>
    );
  };
  const selectedChatHTML = () => {
    if (!selectedChat) return null;
    return (
      <>
        <div className="col-lg-6 selected_chat">
          <div className="d-flex align-items-center gap-3">
            <img
              src={selectedChat?.participant_profile}
              className="img-fluid border-golder rounded-circle "
              alt="User"
            />
            <h4 className="secondary-regular-font mb-0 text-white level-7 text-capitalize">
              {selectedChat?.participant_name}
            </h4>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="dot-drop-down chat-dot">
            <div className="camera-link-ww">
              <Link to="">
                <img src={camerachat} className="img-fluid" alt="" />
              </Link>
            </div>
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
                  >
                    <i className="fas fa-trash-alt level-8 extra-color-10"></i>{" "}
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
          }
        `}
      </style>
      <div className="chat-wrapper">
        <div className="row">
          <div className="col-lg-4">
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
              {selectedChatHTML()}
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
                              {message.attachment && (
                                <img
                                  src={message.attachment}
                                  alt="Attachment"
                                  className="img-fluid mt-2 w-25"
                                />
                              )}
                            </div>
                            {message.type === "outgoing" && (
                              <img
                                src={message.profile_image_url}
                                className="img-fluid chat-users rounded-circle"
                                alt={`User ${index + 1}`}
                              />
                            )}
                          </div>
                          {/* {message.date && (
                        <div className="row">
                          <div className="col-lg-5 mx-auto position-relative">
                            <h5 className="wrapper-dash-gg dash-date level-8 extra-color-16 secondary-regular-font text-center">
                              {message.date}
                            </h5>
                          </div>
                        </div>
                      )} */}
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
              {sendMessageFormHTML()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatComponent;
