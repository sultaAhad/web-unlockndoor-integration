import { Link } from "react-router-dom";
import { deletetrash } from "../Constant/Index";
import Swal from "sweetalert2";
import {
	useDeleteImageWomanMutation,
	useDeleteVideoWomanMutation,
} from "../network/services/WomanAuth";
import {
	useDeleteImageManMutation,
	useDeleteVideoManMutation,
} from "../network/services/ManAuth";
import { useEffect, useRef } from "react";

// Fancybox imports
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { toast } from "react-toastify";

const ImageVideo = ({
	file,
	type,
	onDelete,
	refetch,
	fileCount = 0,
	location = null,
}) => {
	const [deleteImageWoman, responseImageWoman] = useDeleteImageWomanMutation();
	const [deleteVideoWoman, responseVideoWoman] = useDeleteVideoWomanMutation();
	const [deleteImageMan, responseImageMan] = useDeleteImageManMutation();
	const [deleteVideoMan, responseVideoMan] = useDeleteVideoManMutation();

	const fileName = useRef(file.split("/").pop());
	const gender = localStorage.getItem("gender");

	useEffect(() => {
		Fancybox.bind("[data-fancybox]", {
			Toolbar: {
				display: [
					{ id: "counter", position: "center" },
					"zoom",
					"fullscreen",
					"close",
				],
			},
			Video: {
				autoplay: true,
			},
		});

		return () => {
			Fancybox.destroy();
		};
	}, []);

	const limits = { image: 5, video: 2 };

	const validate = (type) => {
		if (location !== "profile") return true;

		return fileCount > limits[type];
	};

	const deleteFile = (file, type) => {
		if (validate(type)) {
			Swal.fire({
				title: "Are you sure?",
				text: `You will not be able to recover this ${type} file!`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then((result) => {
				if (result.isConfirmed) {
					if (gender === "women") {
						if (type === "image") {
							deleteImageWoman({ image: fileName?.current });
						} else if (type === "video") {
							deleteVideoWoman({ video: fileName?.current });
						}
					}
					if (gender === "men") {
						if (type === "image") {
							deleteImageMan({ image: fileName?.current });
						} else if (type === "video") {
							deleteVideoMan({ video: fileName?.current });
						}
					}
					onDelete?.(true);
				}
			});
		} else {
			toast.error(
				`Unable to delete file. minimum ${limits[type]}  ${type} file is required to be on profile and you have only ${fileCount} `,
			);
		}
	};

	// ✅ Success + Refetch
	useEffect(() => {
		if (responseImageMan?.data?.status) {
			Swal.fire({
				icon: "success",
				title: responseImageMan?.data?.message,
				showConfirmButton: false,
				timer: 1500,
			});
			refetch?.();
		}
	}, [responseImageMan]);

	useEffect(() => {
		if (responseVideoMan?.data?.status) {
			Swal.fire({
				icon: "success",
				title: responseVideoMan?.data?.message,
				showConfirmButton: false,
				timer: 1500,
			});
			refetch?.();
		}
	}, [responseVideoMan]);

	useEffect(() => {
		if (responseImageWoman?.data?.status) {
			Swal.fire({
				icon: "success",
				title: responseImageWoman?.data?.message,
				showConfirmButton: false,
				timer: 1500,
			});
			refetch?.();
		}
	}, [responseImageWoman]);

	useEffect(() => {
		if (responseVideoWoman?.data?.status) {
			Swal.fire({
				icon: "success",
				title: responseVideoWoman?.data?.message,
				showConfirmButton: false,
				timer: 1500,
			});
			refetch?.();
		}
	}, [responseVideoWoman]);

	// Render video
	if (type === "video") {
		return (
			<div className="col-md-6">
				<div className="pictures_dv">
					<div className="pic_dv position-relative">
						<div className="del_icon d-flex align-items-center justify-content-center">
							<Link
								className="cursor-pointer"
								onClick={() => deleteFile(file, type)}
							>
								<img
									src={deletetrash}
									className="img-fluid wrapper-deletetrash"
								/>
							</Link>
						</div>

						{/* Fancybox trigger */}
						<a data-fancybox="gallery" href={file}>
							<video className="w-100" muted>
								<source src={file} type="video/mp4" />
							</video>
							<div className="pic_icon cursor-pointer">
								<i className="fa fa-play" aria-hidden="true"></i>
							</div>
						</a>
					</div>
				</div>
			</div>
		);
	}

	// Render image
	if (type === "image") {
		return (
			<div className="col-md-6">
				<div className="pictures_dv">
					<div className="pic_dv position-relative">
						<div className="del_icon d-flex align-items-center justify-content-center">
							<Link
								className="cursor-pointer"
								onClick={() => deleteFile(file, type)}
							>
								<img
									src={deletetrash}
									className="img-fluid wrapper-deletetrash"
								/>
							</Link>
						</div>

						{/* Fancybox trigger */}
						<a data-fancybox="gallery" href={file}>
							<img src={file} alt="uploaded" className="setimgwrapper" />
						</a>
					</div>
				</div>
			</div>
		);
	}
};

export default ImageVideo;
