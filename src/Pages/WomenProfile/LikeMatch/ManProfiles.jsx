import React, { useEffect, useRef } from "react";
import "../../../assets/Css/profile.css";
import {
  innerpages,
  manproimage,
  manproimage1,
  manproimage2,
  manproimage3,
  manproimage4,
  manproimage5,
  manproimage6,
  manproimage7,
  massagewrapper,
  mdi_dollar,
  p1,
  p2,
  p4,
  p5,
  p8,
  skillimg,
} from "../../../Constant/Index";
import AOS from "aos";
import { Link, useLocation } from "react-router-dom";
import ProfileNavbartwo from "../../../Components/ProfileNavbartwo";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer";
function ManProfiles() {
  // useEffect(() => {
  //   AOS.init({ duration: 1000, once: true }); // Initialize AOS with options
  // }, []);
  // useEffect(() => {
  //   document.body.style.backgroundImage = `url(${innerpages})`;
  //   document.body.style.backgroundSize = "cover";
  //   document.body.style.backgroundPosition = "center";
  //   document.body.style.minHeight = "100vh";

  //   return () => {
  //     document.body.style.backgroundImage = "";
  //   };
  // }, []);

  const location = useLocation();
  const user = useRef(location?.state);
  console.log(user);

  return (
    <>
      <Header />

      <section className="profile_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12 pb-5">
              <div className="profile_banner_img">
                <img
                  src={user?.current?.cover_image_url}
                  className="img-fluid banner_img"
                />
                <div className="profile_img_div">
                  <img
                    src={user?.current?.profile_image_url}
                    className="img-fluid profile_imgg"
                  /> 
                  <h5>{user?.current?.name}</h5>
                </div>

                <div className="account_access_dv">
                  <div className="notify_edit_dv">
                    <ul>
                      <Link
                        className="text-decoration-none text-white secondary-secondregular-font"
                        to="/chat-women"
                      >
                        <li className="wrapper-navigate-main position-relative">
                          <img src={massagewrapper} /> <span>Message</span>
                          <span className="number_move_dv">21</span>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 pt-5 for-extra-space">
              <div className="profile_info_dv">
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
                    <div className="info_ul">
                      <ul>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p1} />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Name : </span>
                                {user?.current?.name}
                              </h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p2} />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area"> DOB : </span>
                                {user?.current?.date_of_birth}
                              </h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={mdi_dollar} />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">
                                  {" "}
                                  Annual Income :{" "}
                                </span>
                                $ {user?.current?.income}
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
                    <div className="info_ul">
                      <ul>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p5} />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Email : </span>
                                {user?.current?.email}
                              </h5>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={skillimg} />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area"> Skills : </span>
                                {user?.current?.skills}
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
                    <div className="info_ul">
                      <ul>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p8} />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">
                                  Phone Number :{" "}
                                </span>
                                {user?.current?.phone}
                              </h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dv_for_flex">
                            <div className="img_dv">
                              <img src={p4} />
                            </div>
                            <div className="text_dv">
                              <h5>
                                <span className="blod_area">Occupation :</span>
                                {user?.current?.occupation}
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <p className="text-white secondary-semibold-font p-2">
                      Message:{" "}
                      <span className="secondary-regular-font">
                        {user?.current?.message}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {user?.current?.images_urls.length > 0 ? (
        <section className="pictures_sec" data-aos="fade-left">
          <div className="container">
            <div className="pic_head">
              <div className="d-flex justify-content-between">
                <h3>Pictures</h3>
              </div>
            </div>
            <div className="row mt-3">
              {user?.current?.images_urls.map((image) => (
                <div className="col-md-6">
                  <div className="pictures_dv">
                    <div className="pic_dv">
                      <img src={image} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      {user?.current?.videos_urls.length > 0 ? (
        <section className="videos_sec" data-aos="fade-right">
          <div className="container">
            <div className="pic_head">
              <div className=" d-flex  justify-content-between">
                <h3>Videos</h3>
              </div>
            </div>
            <div className="row mt-3">
              {user?.current?.videos_urls.map((video) => (
                <div className="col-md-6">
                  <div className="pictures_dv">
                    <div className="pic_dv">
                      <img src={video} />
                      <div className="pic_icon">
                        <i class="fa fa-play" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      <Footer />
    </>
  );
}

export default ManProfiles;
