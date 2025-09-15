import React, { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
  deletetrash,
  edit,
  editimg,
  innerpages,
  p1,
  p2,
  p4,
  p5,
  p8,
  skillimg,
  mdi_dollar,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import { checkMiddleware } from "../../middleware/checkMiddleware";
import {
  useGetManDataQuery,
  useDeleteImageManMutation,
  useDeleteVideoManMutation,
} from "../../network/services/ManAuth";
import ImageVideo from "../../Components/ImageVideo";
import ProfileHeader from "../../Components/ProfileHeader";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser, setUserToken } from "../../network/reducers/AuthReducer";

function Profile() {
  const { data, isLoading, error, refetch } = useGetManDataQuery();
  const user = data?.response?.data?.data;

  const [deleteImageMan] = useDeleteImageManMutation();
  const [deleteVideoMan] = useDeleteVideoManMutation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ images: [], videos: [] });

  // Update form when user data is loaded
  useEffect(() => {
    if (user) {
      setForm({
        images: user.images_urls || [],
        videos: user.videos_urls || [],
      });
      dispatch(setUser(user));
    }
  }, [user]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${innerpages})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile.</div>;

  return (
    <>
      <Header />

      <section className="profile_sec" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />
            <div className="col-md-12 pt-5 for-extra-space">
              <ProfileNavbartwo />
              <div className="profile_info_dv">
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-3">
                    <div className="info_ul">
                      <ul>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p1} alt="Name Icon" />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Name: </span>
                                {user?.name}
                              </h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p2} alt="DOB Icon" />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">DOB: </span>
                                {user?.date_of_birth}
                              </h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={mdi_dollar} alt="Income Icon" />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">
                                  Annual Income:{" "}
                                </span>
                                {user?.income}
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Middle Columns */}
                  <div className="col-md-3">
                    <div className="info_ul">
                      <ul>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p5} alt="Email Icon" />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Email: </span>
                                {user?.email}
                              </h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={skillimg} alt="Skills Icon" />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Skills: </span>
                                {user?.skills}
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="info_ul">
                      <ul>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p8} alt="Phone Icon" />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Phone: </span>
                                {user?.phone}
                              </h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p4} alt="Occupation Icon" />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Occupation: </span>
                                {user?.occupation}
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="col-md-3">
                    <div className="edit_btn text-end">
                      <Link to="/edit-men-profile">
                        <button>
                          <span className="d-flex gap-3 align-content-center justify-content-center">
                            <img
                              src={editimg}
                              alt="Edit image"
                              className="edit_img me-2"
                            />
                            Edit Details
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="col-lg-12">
                    <p className="text-white secondary-medium-font">
                      Message:{" "}
                      <span className="secondary-regular-font">
                        {user?.message}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pictures Section */}
      <section className="pictures_sec" data-aos="fade-left">
        <div className="container">
          <div className="pic_head">
            <h3>Pictures</h3>
          </div>
          <div className="row mt-3">
            {form.images.map((image, index) => (
              <ImageVideo
                key={index}
                file={image}
                type="image"
                onDelete={() => refetch()}
                className="wrapperimgset"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="videos_sec" data-aos="fade-right">
        <div className="container">
          <div className="pic_head">
            <h3>Videos</h3>
          </div>
          <div className="row mt-3">
            {form.videos.map((video, index) => (
              <ImageVideo
                key={index}
                file={video}
                type="video"
                onDelete={() => refetch()}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default checkMiddleware(Profile, true, true);
