import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import { calenderwrapper1, uploader_icon } from "../../Constant/Index";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  useDeleteImageManMutation,
  useDeleteVideoManMutation,
  useEditProfileMutation,
  useGetManDataQuery,
  useUpdateCoverImageMutation,
  useUpdateProfileImageMutation,
} from "../../network/services/ManAuth";
import { setUser } from "../../network/reducers/AuthReducer";

function Meneditprofile() {
  const { data, refetch } = useGetManDataQuery();
  const user = data?.response?.data?.data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const parseValidDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const parsedSkills = user?.skills
    ? Array.isArray(user.skills)
      ? user.skills
      : user.skills.split(",").map((s) => s.trim())
    : [];

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    income: user?.income || "",
    date_of_birth: parseValidDate(user?.date_of_birth),
    skills: parsedSkills,
    message: user?.message || "",
    occupation: user?.occupation || "",
    nationality: user?.nationality || "",
    bannerImage: user?.cover_image_url || null,
    profileImage: user?.profile_image_url || null,
    images: user?.images_urls || [],
    videos: user?.videos_urls || [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const [updateProfileImage, { isLoading: isProfileImageLoading }] =
    useUpdateProfileImageMutation();
  const [updateCoverImage, { isLoading: isCoverImageLoading }] =
    useUpdateCoverImageMutation();
  const [editProfile, { isLoading: isEditProfileLoading }] =
    useEditProfileMutation();
  const [deleteImageMan] = useDeleteImageManMutation();
  const [deleteVideoMan] = useDeleteVideoManMutation();

  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const videosInputRef = useRef(null);

  // ===== Banner Upload =====
  // ===== Banner Upload =====
  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview instantly
    const localPreview = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      bannerImage: localPreview,
    }));

    try {
      const formData = new FormData();
      formData.append("cover_image", file);

      const response = await updateCoverImage(formData).unwrap();

      if (response.data?.cover_image_url) {
        setForm((prev) => ({
          ...prev,
          bannerImage: response.data.cover_image_url, // replace with server image
        }));
        dispatch(
          setUser({ ...user, cover_image_url: response.data.cover_image_url })
        );
        refetch();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Cover image updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Failed to update cover image:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error.data?.message ||
          "Failed to update cover image. Please try again.",
      });
    }
  };

  // ===== Profile Upload =====
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview instantly
    const localPreview = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      profileImage: localPreview,
    }));

    try {
      const formData = new FormData();
      formData.append("profile_image", file);

      const response = await updateProfileImage(formData).unwrap();

      if (response.data?.profile_image_url) {
        setForm((prev) => ({
          ...prev,
          profileImage: response.data.profile_image_url, // replace with server image
        }));
        dispatch(
          setUser({
            ...user,
            profile_image_url: response.data.profile_image_url,
          })
        );
        refetch();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile image updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Failed to update profile image:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error.data?.message ||
          "Failed to update profile image. Please try again.",
      });
    }
  };

  // ===== Skills =====
  const handleAddChip = (chip) => {
    if (chip && !form.skills.includes(chip)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, chip] }));
    }
  };
  const handleRemoveChip = (chip) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((c) => c !== chip),
    }));
  };

  // ===== Upload files =====
  const handleFileChange = (e, type) => {
    const selectedFiles = Array.from(e.target.files);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));

    if (type === "images") {
      setImageFiles((prev) => [...prev, ...selectedFiles]);
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } else if (type === "videos") {
      setVideoFiles((prev) => [...prev, ...selectedFiles]);
      setForm((prev) => ({ ...prev, videos: [...prev.videos, ...urls] }));
    }
  };

  const removeFile = async (index, type) => {
    try {
      let formData = new FormData();

      if (type === "images") {
        const fileUrl = form.images[index];

        // extract only the filename from the URL
        const fileName = fileUrl.split("/").pop();

        formData.append("image", fileName);

        const response = await deleteImageMan(formData).unwrap();

        if (response.status === 200) {
          setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
          }));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Image deleted successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } else if (type === "videos") {
        const fileUrl = form.videos[index];

        // extract only the filename from the URL
        const fileName = fileUrl.split("/").pop();

        formData.append("video", fileName);

        const response = await deleteVideoMan(formData).unwrap();

        if (response.status === 200) {
          setForm((prev) => ({
            ...prev,
            videos: prev.videos.filter((_, i) => i !== index),
          }));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Video deleted successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }

      refetch();
    } catch (error) {
      console.error("Failed to remove file:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.data?.message || "Could not delete, please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  // ===== Validation =====
  const validateForm = () => {
    const errors = {};
    if (!form.name?.trim()) errors.name = "Name is required";
    if (!form.email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.date_of_birth) errors.date_of_birth = "Date of Birth is required";
    else if (form.date_of_birth >= new Date())
      errors.date_of_birth = "Date of Birth must be before today";
    if (!form.occupation?.trim()) errors.occupation = "Occupation is required";
    if (!form.income?.trim()) errors.income = "Annual income is required";
    if (!form.skills.length) errors.skills = "At least one skill is required";
    if (!form.message?.trim()) errors.message = "Message is required";
    if (!form.bannerImage && !bannerInputRef.current?.files[0])
      errors.bannerImage = "Cover image is required";
    if (!form.profileImage && !profileInputRef.current?.files[0])
      errors.profileImage = "Profile image is required";
    if (imageFiles.length + (user?.images_urls?.length || 0) < 5)
      errors.images = "At least 5 images are required";
    if (videoFiles.length + (user?.videos_urls?.length || 0) < 2)
      errors.videos = "At least 2 videos are required";

    return errors;
  };

  // ===== Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors({});

    if (form.date_of_birth > minAgeDate) {
      errors.date_of_birth = `Date of birth must be minimum ${minAgeDate}`;
    }
    if (form?.phone?.length < 10 || form?.phone?.length > 15) {
      errors.phone = "phone number must be between 10 to 15 digits";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields correctly",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("income", form.income);
      formData.append(
        "date_of_birth",
        form.date_of_birth.toISOString().split("T")[0]
      );
      formData.append("skills", form.skills.join(","));
      formData.append("message", form.message);
      formData.append("occupation", form.occupation);
      formData.append("nationality", form.nationality);

      if (profileInputRef.current?.files[0])
        formData.append("profile_image", profileInputRef.current.files[0]);
      if (bannerInputRef.current?.files[0])
        formData.append("cover_image", bannerInputRef.current.files[0]);

      imageFiles.forEach((file) => formData.append("images[]", file));
      videoFiles.forEach((file) => formData.append("videos[]", file));

      const response = await editProfile(formData).unwrap();

      if (response.status === 200) {
        const updatedData = response.response.data;
        dispatch(setUser(updatedData));
        refetch();
        setForm((prev) => ({
          ...prev,
          images: updatedData.images_urls,
          videos: updatedData.videos_urls,
        }));

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/profile"));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.data?.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== Sync user data =====
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        income: user.income || "",
        date_of_birth: parseValidDate(user.date_of_birth),
        skills: Array.isArray(user.skills)
          ? user.skills
          : user.skills?.split(",") || [],
        message: user.message || "",
        occupation: user.occupation || "",
        nationality: user.nationality || "",
        bannerImage: user.cover_image_url || null,
        profileImage: user.profile_image_url || null,
        images: user.images_urls || [],
        videos: user.videos_urls || [],
      });
    }
  }, [user]);

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Header />

      {/* Banner + Profile */}
      <section className="profile_sec pt-5 pb-5" data-aos="fade-up">
        <div className="container">
          <div className="profile_banner_img position-relative">
            <img
              src={form.bannerImage}
              className="img-fluid banner_img"
              alt="Banner"
            />
            <div className="camera-wrapper-pp position-absolute bottom-0 right-0 m-3">
              <button
                type="button"
                className="btn p-0"
                onClick={() => bannerInputRef.current.click()}
                disabled={isCoverImageLoading}
              >
                {isCoverImageLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <i className="fa-solid fa-camera"></i>
                )}
              </button>
              <input
                type="file"
                ref={bannerInputRef}
                onChange={handleBannerChange}
                accept="image/*"
                hidden
                disabled={isCoverImageLoading}
              />
            </div>

            <div className="profile_img_div">
              <div className="position-relative text-center">
                <figure className="position-relative mb-0">
                  <img
                    src={form.profileImage}
                    className="img-fluid profile_imgg"
                    alt="Profile"
                  />
                  <div className="camera-wrapper-pp wrapp-camera-po position-absolute bottom-50">
                    <button
                      type="button"
                      className="btn p-0"
                      onClick={() => profileInputRef.current.click()}
                      disabled={isProfileImageLoading}
                    >
                      {isProfileImageLoading ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <i className="fa-solid fa-camera"></i>
                      )}
                    </button>
                    <input
                      type="file"
                      ref={profileInputRef}
                      onChange={handleProfileChange}
                      accept="image/*"
                      hidden
                      disabled={isProfileImageLoading}
                    />
                  </div>
                </figure>
                <h5>
                  {(form?.name && form.name.length > 20
                    ? form.name.slice(0, 20) + "..."
                    : form?.name) || "John Smith"}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Form */}
      <div className="register_sec py-5">
        <div className="container">
          <div className="profile_dv">
            <form onSubmit={handleSubmit}>
              <div className="row form_control_all">
                {/* Name */}
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                    {formErrors.name && (
                      <p className="text-danger">{formErrors.name}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="email"
                      value={form.email}
                      disabled
                      style={{ backgroundColor: "#f0f0f0", color: "#6c757d" }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone || ""}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="form-control"
                  />
                  {formErrors.phone && (
                    <p className="text-danger">{formErrors.date_of_birth}</p>
                  )}
                </div>

                {/* DOB */}
                <div className="col-md-4">
                  <div className="form-group position-relative">
                    <DatePicker
                      selected={
                        form.date_of_birth instanceof Date
                          ? form.date_of_birth
                          : null
                      }
                      onChange={(date) =>
                        setForm((prev) => ({ ...prev, date_of_birth: date }))
                      }
                      placeholderText="Date Of Birth"
                      dateFormat="dd/MM/yyyy"
                      maxDate={minAgeDate}
                      className="custom_datePicker"
                    />
                    <div className="input_icons">
                      <img src={calenderwrapper1} alt="" />
                    </div>
                    {formErrors.date_of_birth && (
                      <p className="text-danger">{formErrors.date_of_birth}</p>
                    )}
                  </div>
                </div>

                {/* Nationality */}
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nationality "
                      value={form.nationality}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          nationality: e.target.value,
                        }))
                      }
                    />
                    {formErrors.nationality && (
                      <p className="text-danger">{formErrors.nationality}</p>
                    )}
                  </div>
                </div>

                {/* Occupation */}
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Occupation"
                      value={form.occupation}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          occupation: e.target.value,
                        }))
                      }
                    />
                    {formErrors.occupation && (
                      <p className="text-danger">{formErrors.occupation}</p>
                    )}
                  </div>
                </div>

                {/* Income */}
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Annual Income"
                      value={form.income}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          income: e.target.value,
                        }))
                      }
                    />
                    {formErrors.income && (
                      <p className="text-danger">{formErrors.income}</p>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="col-lg-4">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Add a skill and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddChip(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <div className="chips d-flex gap-2 flex-wrap mt-2">
                      {form.skills.map((chip) => (
                        <div
                          key={chip}
                          className="chip px-2 py-1 border rounded bg-light"
                        >
                          {chip}
                          <span
                            className="ms-2 chipwwww text-danger"
                            onClick={() => handleRemoveChip(chip)}
                            style={{ cursor: "pointer" }}
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                    </div>
                    {formErrors.skills && (
                      <p className="text-danger">{formErrors.skills}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="col-md-4">
                  <div className="form-group">
                    <textarea
                      style={{ borderRadius: "10px" }}
                      rows="4"
                      value={form.message}
                      className="form_input-21 input_border w-100"
                      placeholder="Message"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                    />
                    {formErrors.message && (
                      <p className="text-danger">{formErrors.message}</p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="col-md-4 align-content-center">
                  <button
                    type="submit"
                    className="border radius-8 secondary-regular-font"
                    disabled={isSubmitting || isEditProfileLoading}
                  >
                    {isSubmitting || isEditProfileLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
                {/* Images */}
                <div className="col-md-4">
                  <div className="form-group upload-section upload-section11 mt-2">
                    <label className="text-white">
                      Upload 5 pictures minimum
                    </label>
                    <div className="uploader py-3 rounded mt-2 position-relative">
                      <div className="upload_pic text-center">
                        <div className="content_uploader">
                          <img
                            src={uploader_icon}
                            alt=""
                            className="img-fluid"
                          />
                          <p className="secondary-secondsemibold-font text-white">
                            Upload here
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        ref={imagesInputRef}
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(e, "images")}
                      />
                    </div>
                    <div className="preview-container d-flex flex-wrap gap-2 mt-2">
                      {form.images.map((img, i) => (
                        <div key={i} className="position-relative">
                          <img
                            src={img}
                            alt=""
                            className="preview-img preview-imgvide img-fluid"
                          />
                          <span
                            className="position-absolute d-flex align-items-center justify-content-center top-0 end-0 bg-danger text-white rounded-circle border-0"
                            style={{
                              width: 20,
                              height: 20,
                              lineHeight: "14px",
                              fontSize: 14,
                              cursor: "pointer",
                            }}
                            onClick={() => removeFile(i, "images")}
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                      <div class="col-lg-10">
                        <label className="mt-1">
                          Note :{" "}
                          <span className="label_span">
                            make sure you got the best of your attractiveness
                            and qualities{" "}
                          </span>
                        </label>
                      </div>
                      {formErrors.images && (
                        <span className="text-danger">{formErrors.images}</span>
                      )}
                    </div>
                  </div>
                </div>
                {/* Videos */}
                <div className="col-md-4">
                  <div className="form-group upload-section upload-section11 mt-2">
                    <label className="text-white">
                      Upload 2 videos minimum
                    </label>
                    <div className="uploader py-3 rounded mt-2 position-relative">
                      <div className="upload_pic text-center">
                        <div className="content_uploader">
                          <img
                            src={uploader_icon}
                            alt=""
                            className="img-fluid"
                          />
                          <p className="secondary-secondsemibold-font text-white">
                            Upload here
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        ref={videosInputRef}
                        accept="video/*"
                        multiple
                        onChange={(e) => handleFileChange(e, "videos")}
                      />
                    </div>
                    <div className="preview-container d-flex flex-wrap gap-2 mt-2">
                      {form.videos.map((vid, i) => (
                        <div key={i} className="position-relative">
                          <video
                            src={vid}
                            className="preview-img preview-imgvide rounded object-cover"
                            controls
                          />
                          <span
                            className="position-absolute d-flex align-items-center justify-content-center top-0 end-0 bg-danger text-white rounded-circle border-0"
                            style={{
                              width: 20,
                              height: 20,
                              lineHeight: "14px",
                              fontSize: 14,
                              cursor: "pointer",
                            }}
                            onClick={() => removeFile(i, "videos")}
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                      {formErrors.videos && (
                        <span className="text-danger">{formErrors.videos}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Meneditprofile;
