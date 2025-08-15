import React from 'react'
import { map, p5, phone, weblogo } from '../Constant/Index'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <section className="footer_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="footer_widget widget1">
                <div className="footer_logo">
                  {/* <img src={weblogo} alt="weblogo" className="img-fluid" /> */}
                  <h2 className='text-white secondary-secondmedium-font'>No Games. Just Clarity,
                  <span className="gradient-text secondary-secondmedium-font"> Consent & Connection.</span>{' '}
                </h2>
                  <div className="text_wrapper">
                    <p>
                      This space is built for bold conversations and mutual respect. From the first message, it’s all about clear intentions, honest vibes, and connections that actually make sense—for both of you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-2">
              <div className="footer_widget widget2">
                <div className="footer_head">
                  <h3>quick links</h3>
                  <div className="footer_ul">
                    <ul>
                      <li>
                        <Link to='/#about-section'>About us</Link>
                      </li>
                      <li>
                        <Link to='/#realitysec'>Testimonials </Link>
                      </li>
                      <li>
                        <Link to='/#contectus'>Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer_widget widget2">
                <div className="footer_head">
                  <h3>Help & Support</h3>
                  <div className="footer_ul">
                    <ul>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/terms-condition">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link to="/help-support">Help & Support</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>

            <div className="col-md-3">
              <div className="footer_widget widget2">
                <div className="footer_head">
                  <h3>Contact Info</h3>
                  <div className="footer_ul">
                    <div className="footer_map_text">
                      <div className="map_img">
                        <img src={map} alt="map_img" />
                      </div>
                      <div className="map_text">
                        <p>consectetur adipiscing elit, sed do ipsum</p>
                      </div>
                    </div>

                    <div className="footer_map_text pt-3">
                      <div className="map_img">
                        <img src={phone} alt="map_img" />
                      </div>
                      <div className="map_text">
                        <p>
                          <Link to="tel:123456789">Phone: (628) 561–5880</Link>
                        </p>
                        {/* <p>
                          <Link to="mailto:support@lorem.co.uk">
                            Mail: support@lorem.co.uk
                          </Link>
                        </p> */}
                      </div>
                    </div>

                    <div className="footer_map_text pt-3">
                      <div className="map_img">
                        <img src={p5} alt="map_img" />
                      </div>
                      <div className="map_text">
                        {/* <p>
                          <Link to="tel:123456789">Phone: 123 456 789</Link>
                        </p> */}
                        <p>
                          <Link to="mailto:TheGuru@unlockingnTheDoor.com">
                            TheGuru@unlockingnTheDoor.com
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-md-12">
              <div className="dv_copy_right">
                <p>© 2024 unlockthedoor All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
