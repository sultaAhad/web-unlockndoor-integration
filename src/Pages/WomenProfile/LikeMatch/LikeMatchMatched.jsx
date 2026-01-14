import { useEffect, useState } from "react";
import "../../../assets/Css/matchprofile.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer";
import { Link } from "react-router-dom";
import ProfileNavbar from "../../../Components/ProfileNavbar";
import Pagination from "../../../Components/Pagination";
import ProfileHeader from "../../../Components/ProfileHeader";
import LikeMatchCard from "../../../Components/LikeMatchCard";
import Spinner from "../../../Components/Spinner";
import {useLazyGetWomanMatchProfilesQuery } from "../../../network/services/WomanAuth";
import { ToastContainer } from "react-toastify";

function LikeMatchMatched() {
	const [filterBy, setFilterBy] = useState("matched");
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [matchedProfiles, setMatchedProfiles] = useState([]);
	const [previousProfiles, setPreviousProfiles] = useState([]);

	const [trigger, { data, isLoading, isFetching }] = useLazyGetWomanMatchProfilesQuery();

	useEffect(() => {
		trigger({
			filterBy,
			page: currentPage,
			_t: Date.now(), 
		});
	}, [trigger, filterBy, currentPage]);

	useEffect(() => {
		if (data?.data) {
			setPreviousProfiles(matchedProfiles);
			setMatchedProfiles(Array.isArray(data.data.data) ? data.data.data : []);
			setCurrentPage(data.data.current_page ?? currentPage);
			setLastPage(data.data.last_page ?? 1);
		}
	}, [data]);

	const activeStyle = {
		backgroundColor: "#c22751",
		color: "#fff",
		border: "1px solid #c22751",
	};

	const buttonBaseStyle = {
		padding: "10px 24px",
		borderRadius: "999px",
		fontWeight: "500",
		fontSize: "14px",
		border: "1px solid #c22751",
		backgroundColor: "transparent",
		color: "#c22751",
		cursor: "pointer",
		textDecoration: "none",
		transition: "all 0.3s ease",
	};

	const displayProfiles = isFetching
		? previousProfiles.length > 0
			? previousProfiles
			: matchedProfiles
		: matchedProfiles;

	return (
		<>
			<Header />
			<ToastContainer />

			<section className="profile_sec">
				<div className="container">
					<div className="row">
						<ProfileHeader />
						<div className="col-md-12 pt-5 for-extra-space mt-5">
							<ProfileNavbar />
						</div>
					</div>
				</div>
			</section>

			<section className="videos_sec">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="d-flex flex-sm-row flex-column align-items-center gap-3 justify-content-end mb-4">
								<Link
									onClick={() => {
										setCurrentPage(1);
										setMatchedProfiles([]);
										setFilterBy("matched");
									}}
									className="secondary-medium-font text-white"
									style={{
										...buttonBaseStyle,
										...(filterBy === "matched" ? activeStyle : {}),
									}}
								>
									Matched Members
								</Link>

								<Link
									className="secondary-medium-font"
									onClick={() => {
										setCurrentPage(1);
										setMatchedProfiles([]);
										setFilterBy("liked");
									}}
									style={{
										...buttonBaseStyle,
										...(filterBy === "liked" ? activeStyle : {}),
									}}
								>
									Unmatched Members
								</Link>
							</div>
						</div>
					</div>

					{/* Spinner while fetching */}
					{isFetching ? (
						<div className="row justify-content-center">
							<Spinner />
						</div>
					) : (
						<div className="row">
							{displayProfiles && displayProfiles.length > 0 ? (
								displayProfiles.map((card, index) => (
									<LikeMatchCard
										key={card?.id ?? index}
										type={filterBy}
										card={card?.liker}
										responseAction={(actionType) => {
											if (actionType === "matched") {
												// switch to matched and fetch new data
												setFilterBy("matched");
												setCurrentPage(1);
												setTimeout(() => refetch(), 300);
											} else {
												refetch();
											}
										}}
									/>
								))
							) : (
								<div className="text-center py-5">
									<p className="level-6 secondary-medium-font text-white">
										No members found.
									</p>
								</div>
							)}
						</div>
					)}

					{typeof lastPage === "number" && lastPage > 1 && (
						<div className="row mt-5 pt-4">
							<div className="col-lg-2 mx-auto">
								<div className="btn-wrapper">
									<Pagination
										currentPage={currentPage}
										lastPage={lastPage}
										onPageChange={(page) => {
											const p = Number(page) || 1;
											if (p !== currentPage) setCurrentPage(p);
										}}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}

export default LikeMatchMatched;
