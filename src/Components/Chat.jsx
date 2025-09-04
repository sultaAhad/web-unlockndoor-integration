import { useEffect, useRef, useState } from "react";
import {
  useGetChatsQuery,
  useSendMessageMutation,
} from "../network/services/Chat";
import { camerachat, paperclip, searchchat } from "../Constant/Index";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Chat({ type }) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown1 = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
    form_id: 0,
    from_type: "Woman",
    to_id: 0,
    to_type: "Men",
    message: 0,
    files: [],
  });

  const { data, isLoading: isChatLoading, refetch } = useGetChatsQuery(type);
  const [sendMessage, sendMessageResponse] = useSendMessageMutation(type);

  useEffect(() => {
    if (data?.chats) {
      setChats(data.chats);
    }
  }, [data]);

  const sendMessageHandle = () => {
    console.log(form);
  };

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
    setForm((prev) => ({ ...prev, files: [...prev.files, ...mapped] }));
  };

  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };
  const sendMessageFormHTML = () => {
    return (
      <>
        {form.files.length > 0 && (
          <div className="d-flex align-items-center gap-2 mb-2">
            {form.files.map((item, index) => (
              <div className="position-relative" key={index}>
                {item.type == "image" ? (
                  <img
                    src={item.preview}
                    className="img-fluid"
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
            onClick={sendMessageHandle}
          >
            Send
          </button>
        </div>
      </>
    );
  };
  const chatsHTML = () => {
    if (!isChatLoading) {
      return (
        <>
          <ul className="p-0 wrapper-chat-b">
            {chats.map((chat) => (
              <li
                key={chat.chat_id}
                onClick={() => setSelectedChat(chat)}
                className="d-flex align-items-start border-bottom justify-content-between py-3 px-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={chat.participant_profile}
                    className="img-fluid chat-users"
                    alt={chat.participant_name}
                  />
                  <div>
                    <div className="d-flex align-items-start gap-2">
                      <h4 className="secondary-semibold-font mb-1 text-white level-8">
                        {chat.participant_name}
                      </h4>
                      <span
                        className={chat.active ? "green active" : "green"}
                      ></span>
                    </div>
                    <p className="mb-0 level-8 extra-color-13 secondary-light-font">
                      {chat.last_message}
                    </p>
                  </div>
                </div>
                {chat.last_message_time && (
                  <h4 className="secondary-medium-font text-white level-8">
                    {chat.last_message_time}
                  </h4>
                )}
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return "";
    }
  };
  const selectedChatHTML = () => {
    if (selectedChat != null) {
      return (
        <>
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-3">
              <img
                src={selectedChat?.participant_profile}
                className="img-fluid border-golder w-25"
                alt="User"
              />
              <h4 className="secondary-regular-font mb-0 text-white level-7">
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
    } else {
      return "";
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="row">
        <div className="col-lg-4">
          <div className="wrapper-member-pp wrapper-chat-input d-flex align-items-center gap-2">
            <img src={searchchat} className="img-fluid" alt="" />
            <div className="input-group ">
              <input
                type="text"
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
            <div className="multichat ">
              {[...messages].reverse().map((message, index) => (
                <div key={message.id}>
                  <div
                    className={`${message.type}-massage d-flex align-items-center gap-3 mt-3 mb-3`}
                  >
                    {message.type === "incoming" && (
                      <img
                        src={message.img}
                        className="img-fluid chat-users"
                        alt={`User ${index + 1}`}
                      />
                    )}

                    <div
                      className={`bg-massage bg-${message.type} ${
                        message.newclass || ""
                      }`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="secondary-medium-font mb-2 mt-2 text-white level-8">
                          {message.user}
                        </h5>
                        <h4 className="secondary-regular-font mb-0 extra-color-13 level-8">
                          {message.time}
                        </h4>
                      </div>

                      {message.content && (
                        <p className="mb-0 extra-color-13 secondary-light-font">
                          {message.content}
                        </p>
                      )}
                      {message.attachment && (
                        <img
                          src={message.attachment}
                          alt="Attachment"
                          className="img-fluid mt-2"
                        />
                      )}
                    </div>

                    {message.type === "outgoing" && (
                      <img
                        src={message.img}
                        className="img-fluid chat-users"
                        alt={`User ${index + 1}`}
                      />
                    )}
                  </div>

                  {message.date && (
                    <div className="row">
                      <div className="col-lg-5 mx-auto position-relative">
                        <h5 className="wrapper-dash-gg dash-date level-8 extra-color-16 secondary-regular-font text-center">
                          {message.date}
                        </h5>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="wrapper-member-pp wrapper-upload-chat">
              {sendMessageFormHTML()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
