import React, { useEffect } from "react";
import { imgregistaionfemale, innerpages2 } from "../../Constant/Index";

const StepThree = ({
	formData,
	setFormData,
	handleSubmit,
	prev,
	formErrors,
}) => {
	const handleFileChange = (e, type) => {
		const files = Array.from(e.target.files);
		switch (type) {
			case "cover":
				setFormData({ ...formData, cover_image: files[0] });
				break;
			case "images":
				setFormData({ ...formData, images: [...formData.images, ...files] });
				break;
			case "videos":
				setFormData({ ...formData, videos: [...formData.videos, ...files] });
				break;
			default:
				break;
		}
	};

	const removeFile = (index, type) => {
		switch (type) {
			case "cover":
				setFormData({ ...formData, cover_image: null });
				break;
			case "images":
				setFormData({
					...formData,
					images: formData.images.filter((_, i) => i !== index),
				});
				break;
			case "videos":
				setFormData({
					...formData,
					videos: formData.videos.filter((_, i) => i !== index),
				});
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages2})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";
		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);

	const renderPreviews = (files, type) =>
		files.map((file, idx) => (
			<div
				key={idx}
				style={{
					display: "inline-block",
					position: "relative",
					marginRight: "10px",
				}}
			>
				{type === "videos" ? (
					<video
						width={100}
						height={100}
						controls
						src={URL.createObjectURL(file)}
					/>
				) : (
					<img
						width={100}
						height={100}
						src={URL.createObjectURL(file)}
						alt="preview"
					/>
				)}
				<button
					type="button"
					style={{ position: "absolute", top: 0, right: 0 }}
					onClick={() => removeFile(idx, type)}
				>
					X
				</button>
			</div>
		));

	return (
		<div className="register_sec py-5 pb-5">
			<div className="container">
				<div className="profile_dv1">
					<div className="row">
						<div className="col-md-6">
							<div className="edit-profile-form">
								<form onSubmit={handleSubmit}>
									<div className="form-group mb-3">
										<label>Cover Image</label>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => handleFileChange(e, "cover")}
										/>
										{formData.cover_image &&
											renderPreviews([formData.cover_image], "cover")}
										{formErrors?.cover_image && (
											<p className="text-danger">{formErrors.cover_image[0]}</p>
										)}
									</div>

									<div className="form-group mb-3">
										<label>Upload 5+ Images</label>
										<input
											type="file"
											accept="image/*"
											multiple
											onChange={(e) => handleFileChange(e, "images")}
										/>
										{formData.images.length > 0 &&
											renderPreviews(formData.images, "images")}
										{formErrors?.images && (
											<p className="text-danger">{formErrors.images[0]}</p>
										)}
									</div>

									<div className="form-group mb-3">
										<label>Upload 2+ Videos</label>
										<input
											type="file"
											accept="video/*"
											multiple
											onChange={(e) => handleFileChange(e, "videos")}
										/>
										{formData.videos.length > 0 &&
											renderPreviews(formData.videos, "videos")}
										{formErrors?.videos && (
											<p className="text-danger">{formErrors.videos[0]}</p>
										)}
									</div>

									<div className="form-group mb-3">
										<textarea
											placeholder="Message"
											value={formData.message}
											onChange={(e) =>
												setFormData({ ...formData, message: e.target.value })
											}
											className="form-control"
										/>
										{formErrors?.message && (
											<p className="text-danger">{formErrors.message[0]}</p>
										)}
									</div>

									<div className="d-flex justify-content-between mt-3">
										<button
											type="button"
											className="btn btn-secondary"
											onClick={prev}
										>
											Previous
										</button>
										<button type="submit" className="btn btn-primary">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-6">
							<img src={imgregistaionfemale} className="img-fluid" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepThree;

{
	/* Modal with Packages */
}
{
	/* <Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				className="modal-content wrapper-model-dd"
				overlayClassName="modal-overlay"
			>
				<button
					type="button"
					onClick={() => {
						setIsModalOpen(false);
						setIsSecondModalOpen(true);
					}}
					className="position-absolute top-0 end-0 m-3 bg-danger text-white border-0 rounded-circle"
					style={{ width: 30, height: 30 }}
				>
					<i class="fa-solid fa-xmark text-white"></i>
				</button>
				<section className="pack_sec py-5">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-4">
								<div className="package_card px-2 py-2 bg-white rounded">
									<div className="">
										<h5 className="dark-color secondary-secondbold-font level-6">
											Verify with a selfie
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Unlock The Door values authenticity. Together, we can
											maintain a safe dating community.
										</p>
									</div>
									<div className="p-2">
										<h5 className="dark-color secondary-secondbold-font">
											100% Confidential
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Your selfie remains private. No one will be able to view
											it on your profile
										</p>
									</div>
									<div className="p-2">
										<h5 className="dark-color secondary-secondbold-font">
											Show You're Real
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Let others know it's really you in your photos
										</p>
									</div>
									<div className="p-2">
										<h5 className="dark-color secondary-secondbold-font">
											Keep Seeking Secure
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Create a safer environment for members to interact and
											meet offline
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Modal> */
}
{
	/* Modal with Packages */
}
{
	/* <Modal
				isOpen={isSecondModalOpen}
				onRequestClose={() => setIsSecondModalOpen(false)}
				className="modal-content wrapper-model-dd"
				overlayClassName="modal-overlay"
			>
				<section className="pack_sec py-5">
					<div className="container">
						<div className="row justify-content-center">
							{packages.map((pack, idx) => (
								<div className="col-md-4" key={idx}>
									<div className="package_card px-3 py-4 main_bg rounded">
										<div className="pack_heading text-center px-3 border-bottom py-3 border-white">
											<h3 className="text-white font_semibold font_level3">
												{pack.title}
											</h3>
											<p className="text-white secondary-secondregular-font">
												{pack.price}
											</p>
										</div>
										<ul className="ps-0 py-3">
											{pack.features.map((f, i) => (
												<li
													key={i}
													className="bullet_Wrapper wrapper-bullet py-2"
												>
													<div className="d-flex align-items-start gap-2 text-white">
														<img src={tick} alt="tick" style={{ width: 20 }} />
														<span>{f}</span>
													</div>
												</li>
											))}
										</ul>
										<div className="pack_btn d-flex justify-content-center">
											<Link to="/man-subscription">
												<button className="btn rounded-pill py-3 px-4 bg-white font_reg text-capitalize font_level4">
													Get Started
												</button>
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</Modal> */
}
