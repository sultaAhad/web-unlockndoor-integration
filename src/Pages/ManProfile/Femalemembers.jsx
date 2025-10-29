import { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { innerpages1 } from "../../Constant/Index";
import AOS from "aos";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import Spinner from "../../Components/Spinner";
import ProfileHeader from "../../Components/ProfileHeader";
import FemaleMemberCard from "../../Components/FemaleMemberCard";
import { ToastContainer, toast } from "react-toastify";
import { useGetFemaleMembershipQuery } from "../../network/services/ManAuth";

function Femalemembers({ member }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [members, setMembers] = useState([]);
	const { data, isLoading, refetch } = useGetFemaleMembershipQuery(currentPage);

	useEffect(() => {
		if (data?.response?.data?.Women?.data) {
			setMembers((prev) =>
				currentPage == 1
					? data.response.data.Women.data
					: [...prev, ...data.response.data.Women.data],
			);
			setLastPage(data.response.data.Women?.last_page);
		}
	}, [data]);

	useEffect(() => {
		refetch();
	}, [currentPage]);

	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
	}, []);

	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages1})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";
		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);

	return (
		<>
			<Header />
			<ToastContainer />
			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<ProfileHeader />
						<div className="col-md-12 pt-5 for-extra-space">
							<ProfileNavbartwo />
						</div>
					</div>
				</div>
			</section>

			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					{isLoading ? (
						<div className="row justify-content-center">
							<Spinner />
						</div>
					) : (
						<div className="row">
							{members.map((member, index) => (
								<FemaleMemberCard
									key={index}
									memberId={member.id}
									member={member}
								/>
							))}
						</div>
					)}

					{lastPage > currentPage && (
						<div className="row">
							<div className="col-lg-2 mx-auto">
								<button
									className="btn-write secondary-medium-font load-more-wrapper rounded-0 d-flex align-items-center justify-content-center extra-bg-1 border-none"
									onClick={() => setCurrentPage((page) => page + 1)}
								>
									{isLoading ? "Fetching" : "Load More"}
								</button>
							</div>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}

export default Femalemembers;

// import { useEffect, useState } from "react";
// import "../../assets/Css/profile.css";
// import Header from "../../Components/Header/Header";
// import Footer from "../../Components/Footer";
// import { innerpages1 } from "../../Constant/Index";
// import AOS from "aos";
// import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
// import Spinner from "../../Components/Spinner";
// import ProfileHeader from "../../Components/ProfileHeader";
// import FemaleMemberCard from "../../Components/FemaleMemberCard";
// import { ToastContainer } from "react-toastify";
// import { useGetFemaleMembershipQuery } from "../../network/services/ManAuth";

// function Femalemembers() {
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [lastPage, setLastPage] = useState(1);
// 	const [members, setMembers] = useState([]);

// 	const { data, isLoading } = useGetFemaleMembershipQuery(currentPage);

// 	// ✅ Load new paginated data
// 	useEffect(() => {
// 		if (data?.response?.data?.Women?.data) {
// 			const newMembers = data.response.data.Women.data;
// 			setLastPage(data.response.data.Women?.last_page);

// 			setMembers((prev) =>
// 				currentPage === 1 ? newMembers : [...prev, ...newMembers],
// 			);
// 		}
// 	}, [data]);

// 	// ✅ Sync swap state from LocalStorage
// 	useEffect(() => {
// 		const swapped = JSON.parse(localStorage.getItem("swapped_members")) || [];

// 		setMembers((prevMembers) =>
// 			prevMembers.map((m) =>
// 				swapped.includes(m.id) ? { ...m, is_swapped: true } : m,
// 			),
// 		);
// 	}, [members.length]);

// 	useEffect(() => {
// 		AOS.init({ duration: 1000, once: true });
// 	}, []);

// 	return (
// 		<>
// 			<Header />
// 			<ToastContainer />

// 			<section className="videos_sec">
// 				<div className="container">
// 					{isLoading ? (
// 						<div className="row justify-content-center">
// 							<Spinner />
// 						</div>
// 					) : (
// 						<div className="row">
// 							{members.map((member) => (
// 								<FemaleMemberCard key={member.id} member={member} />
// 							))}
// 						</div>
// 					)}

// 					{lastPage > currentPage && (
// 						<div className="row">
// 							<div className="col-lg-2 mx-auto">
// 								<button
// 									className="btn-write load-more-wrapper"
// 									onClick={() => setCurrentPage((p) => p + 1)}
// 								>
// 									{isLoading ? "Fetching..." : "Load More"}
// 								</button>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</section>

// 			<Footer />
// 		</>
// 	);
// }

// export default Femalemembers;
