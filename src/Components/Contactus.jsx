import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useHomeContentQuery, useSendContactQueryMutation } from "../network/services/HelpServices";
import { validateContactForm } from "../Constant/HelperFunction";
import Skeleton from "react-loading-skeleton"; // <- Your installed package
import "react-loading-skeleton/dist/skeleton.css";

const Contactus = () => {
  const [sendContactQuery, { isLoading: isSubmitting }] = useSendContactQueryMutation();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const { data: homePageContent, isLoading: isFetching } = useHomeContentQuery();
  const HomePageData = homePageContent?.data?.sectionSeven;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm(values, setErrors)) return;

    try {
      const formData = new FormData();
      for (let key in values) formData.append(key, values[key]);

      const response = await sendContactQuery(formData).unwrap();

      if (response.status) {
        Swal.fire("Success!", response.message || "Your message has been sent successfully.", "success");
        setValues({ first_name: "", last_name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        Swal.fire("Error!", response.message || "Something went wrong.", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error?.data?.message || "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  const textVariant = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const containerVariant = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };

  return (
    <motion.section
      id="contactus"
      className="contact_us_sec pb-5 mt-5 mb-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
    >
      <div className="container">
        {isFetching ? (
          <div className="space-y-4">
            <Skeleton height={300} /> {/* Image */}
            <Skeleton width={150} />   {/* Subtitle */}
            <Skeleton count={4} />     {/* Text */}
            <Skeleton height={50} count={5} /> {/* Form fields */}
            <Skeleton width={140} height={50} /> {/* Submit Button */}
          </div>
        ) : (
          <div className="col-md-12">
            <motion.div className="contact_box" variants={containerVariant}>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <motion.div className="contact_imgbox" variants={textVariant}>
                    <img src={HomePageData?.image_url} alt="Contact" className="img-fluid" />
                  </motion.div>
                </div>

                <div className="col-lg-6">
                  <motion.div className="love_sec_head" variants={textVariant}>
                    <motion.h5 variants={textVariant}>{HomePageData?.page_subtitle}</motion.h5>
                    <motion.h2 variants={textVariant}>
                      {HomePageData?.subtitle_1?.split(" ")[0]}{" "}
                      <span className="gradient-text">
                        {HomePageData?.subtitle_1?.replace(HomePageData?.subtitle_1?.split(" ")[0], "")}
                      </span>
                    </motion.h2>
                    <motion.p className="text-white secondary-secondlight-font" variants={textVariant}>
                      {HomePageData?.content}
                    </motion.p>
                  </motion.div>

                  <motion.form onSubmit={handleSubmit} variants={containerVariant}>
                    <div className="row">
                      {["first_name", "last_name", "phone", "email"].map((field, i) => (
                        <motion.div key={i} className="col-lg-6" variants={textVariant}>
                          <div className="form-group input-wrapper">
                            <input
                              type={field === "email" ? "email" : "text"}
                              name={field}
                              value={values[field]}
                              onChange={handleChange}
                              placeholder={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                              required
                              className="input_font"
                            />
                            {errors[field] && <small className="text-danger">{errors[field][0]}</small>}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div className="form-group input-wrapper text_box" variants={textVariant}>
                      <textarea
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        className="form_input-2 input_border w-100 input_font"
                        rows="4"
                        placeholder="Message"
                        style={{ borderRadius: "10px" }}
                      ></textarea>
                      {errors.message && <small className="text-danger">{errors.message[0]}</small>}
                    </motion.div>

                    <motion.div className="contact_btn" variants={textVariant}>
                      <button
                        type="submit"
                        className="mt-2 border text-center px-3 gradient-button"
                        style={{ width: "140px" }}
                        disabled={isSubmitting}
                      >
                        <span>{isSubmitting ? "Sending..." : "Submit"}</span>
                      </button>
                    </motion.div>
                  </motion.form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Contactus;
