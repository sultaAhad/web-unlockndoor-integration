import React, { useEffect } from "react";
import "../src/assets/Css/style.css";
import "../src/assets/Css/color.css";
import "../src/assets/Css/variable.css";
import "../src/assets/Css/matchprofile.css";
import "../src/assets/Css/profile.css";
import "../src/assets/Css/registeration.css";



// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Publicroutes from "./Routes/Publicroutes";
import { web_new_logo } from "./Constant/Index";
import { Link, Links } from "react-router-dom";

function App() {
	useEffect(() => {
		const myModalElement = document.getElementById("myModal");
		if (myModalElement) {
			const myModal = new bootstrap.Modal(myModalElement);

			// Show the modal on app start
			myModal.show();

			// Ensure proper cleanup
			myModalElement.addEventListener("hidden.bs.modal", () => {
				// Explicitly remove the modal-open class from the body
				document.body.classList.remove("modal-open");
				// Ensure the scrollbar is restored
				document.body.style.overflow = "auto";

				// Remove lingering backdrop
				const backdrop = document.querySelector(".modal-backdrop");
				if (backdrop) {
					backdrop.remove();
				}
			});
		}
	}, []);

	const modalVariants = {
		hidden: { opacity: 0, y: "-100vh" },
		visible: { opacity: 1, y: "0" },
		exit: { opacity: 0, y: "100vh" },
	};

	return (
		<>
			<Publicroutes />
			{/* Main Modal  */}
			<div className="main_modal">
				<div>
					{/* Bootstrap Modal */}
					<div
						className="modal fade"
						id="myModal"
						tabIndex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-body">
									<div className="all_modal_stuff">
										<div className="main_modal_logo text-center">
											<img src={web_new_logo} className="img-fluid" />
										</div>
										<div className="modal_age text-center">
											<h3>Are you over the age of 18?</h3>
											<p>
												You must be 18 or over to view contents on this page
											</p>
										</div>
										<div className="mo_btn">
											<button data-bs-dismiss="modal" className="border">
												Yes I am
											</button>
											<button className="border">No I am not</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* =================  */}
		</>
	);
}

export default App;
