// src/Routes/Publicroutes.jsx

import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Page Imports
import Home from "../Pages/Home";
import Termscondition from "../Pages/Termscondition";
import Privacypolicy from "../Pages/Privacypolicy";
import Helpsupport from "../Pages/Helpsupport";
import ScrollToTop from "../Components/ScrollToTop";
import Editprofile from "../Pages/Editprofile";
import Meneditprofile from "../Pages/ManProfile/Meneditprofile";
import StepFormMan from "../Pages/stepform/StepFormMan";
import StepFormWomen from "../Pages/stepform/StepFormWomen";
import Profile from "../Pages/ManProfile/Profile";
import Chat from "../Pages/ManProfile/Chat";
import Womandetails from "../Pages/ManProfile/Womandetails";
import Mennotification from "../Pages/ManProfile/Mennotification";
import SponsoredDates from "../Pages/ManProfile/SponsoredDates";
import Membership from "../Pages/ManProfile/Membership";
import MatchedProfiles from "../Pages/ManProfile/MatchedProfiles";
import MatchedProfilesDetail from "../Pages/ManProfile/MatchedProfilesDetail";
import WomenEditProfile from "../Pages/WomenProfile/WomenEditProfile";
import DatesTab from "../Pages/WomenProfile/DatesTab";
import LikeMatchUnmatched from "../Pages/WomenProfile/LikeMatchUnmatched";
import LikeMatchMatched from "../Pages/WomenProfile/LikeMatchMatched";
import WomenChat from "../Pages/WomenProfile/WomenChat";
import MembershipWomen from "../Pages/WomenProfile/MembershipWomen";
import WomenNotification from "../Pages/WomenProfile/WomenNotification";
import Setting from "../Pages/WomenProfile/Setting";
import Settingpassword from "../Pages/WomenProfile/Settingpassword";
import ManProfiles from "../Pages/WomenProfile/ManProfiles";
import Femalemembers from "../Pages/ManProfile/Femalemembers";
import Subscriptionwomen from "../Pages/WomenProfile/Subscriptionwomen";
import Mansetting from "../Pages/ManProfile/Mansetting";
import Mansettingpassword from "../Pages/ManProfile/Mansettingpassword";
import Subscription from "../Pages/ManProfile/Subscription";
import WomenProfile from "../Pages/WomenProfile/WomenProfile";

// Wrapper component to use useLocation
function AppRoutes() {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	return (
		<div className="">
			<ScrollToTop />
			<Routes>
				{/* Main Pages */}
				<Route path="/" element={<Home />} />
				<Route path="/terms-condition" element={<Termscondition />} />
				<Route path="/privacy-policy" element={<Privacypolicy />} />
				<Route path="/help-support" element={<Helpsupport />} />

				{/* Man pages */}
				<Route path="/profile" element={<Profile />} />
				<Route path="/female-members" element={<Femalemembers />} />
				<Route path="/edit-men-profile" element={<Meneditprofile />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/woman-details" element={<Womandetails />} />
				<Route path="/men-notifications" element={<Mennotification />} />
				<Route path="/sponsored-dates" element={<SponsoredDates />} />
				<Route path="/my-membership" element={<Membership />} />
				<Route path="/matched-profiles" element={<MatchedProfiles />} />
				<Route
					path="/matched-Profiles-detail"
					element={<MatchedProfilesDetail />}
				/>
				<Route path="/man-settings" element={<Mansetting />} />
				<Route path="/man-change-password" element={<Mansettingpassword />} />
				<Route path="/man-subscription" element={<Subscription />} />

				{/* Woman Pages */}
				<Route path="/women-profiles" element={<WomenProfile />} />
				<Route path="/women-edit-profiles" element={<WomenEditProfile />} />
				<Route path="/dates-tab" element={<DatesTab />} />
				<Route path="/like-match-unmatched" element={<LikeMatchUnmatched />} />
				<Route path="/like-match-matched" element={<LikeMatchMatched />} />
				<Route path="/chat-women" element={<WomenChat />} />
				<Route path="/my-membership-women" element={<MembershipWomen />} />
				<Route path="/women-notification" element={<WomenNotification />} />
				<Route path="/women-settings" element={<Setting />} />
				<Route path="/women-change-password" element={<Settingpassword />} />
				<Route path="/profile-man" element={<ManProfiles />} />
				<Route path="/subscription-women" element={<Subscriptionwomen />} />
				<Route path="/edit-profile" element={<Editprofile />} />
				{/* Registration Form */}
				<Route path="/man-registration" element={<StepFormMan />} />
				<Route path="/women-registration" element={<StepFormWomen />} />
			</Routes>
		</div>
	);
}

function Publicroutes() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}

export default Publicroutes;
