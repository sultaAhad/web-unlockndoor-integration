import { Link } from "react-router-dom";

const LikeMatchCard = ({ card, type, index }) => {
  const MatchedAction = () => (
    <div className="card-left-icons">
      <Link
        to={"/chat-women"}
        rel="noopener noreferrer"
        className={`bottom-icon comment-icon`}
      >
        <i className={`fa-solid fa-comments `}></i>
      </Link>
      <Link
        to={"/chat-women"}
        rel="noopener noreferrer"
        className={`bottom-icon video-icon`}
      >
        <i className={`fa-solid fa-video `}></i>
      </Link>
    </div>
  );

  const UnmatchedAction = () => (
    <div className="card-left-icons">
      <a
        href="javascript:void(0);"
        target="_blank"
        rel="noopener noreferrer"
        className="border only_for_img wrapper-anchor"
      >
        {" "}
        Match Now{" "}
      </a>
    </div>
  );

  return (
    <div className="col-lg-4 col-md-6 mb-4" key={index}>
      <div className="profile-card">
        <img
          src={card?.liker?.profile_image_url}
          alt="profile"
          className="card-image"
        />

        {/* <div className="card-footer">
          <h4>{card?.liker?.name}</h4>
          <p>{card?.liker?.location}</p>
        </div> */}

        <div className="card-bottom d-flex justify-content-between align-items-end">
          {type === "matched" && <MatchedAction />}
          {type === "liked" && <UnmatchedAction />}
          <div className="card-right-actions text-end">
            <Link
              to="/woman/profile-man/2"
              className="view-profile-btn secondary-secondmedium-font"
            >
              View Profile
            </Link>
            <img
              src={card?.liker?.profile_image_url}
              alt="thumb"
              className="profile-thumb"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeMatchCard;
