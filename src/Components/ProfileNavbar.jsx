import React from "react";
import { Link, useLocation } from "react-router-dom";

function ProfileNavbar() {
	const location = useLocation();

	// Function to check if the link is active
	const isActive = (path) => {
		if (path === "/like-match-unmatched") {
			return (
				location.pathname === "/like-match-unmatched" ||
				location.pathname === "/like-match-matched"
			);
		}
		return location.pathname === path;
	};

	const menuItems = [
		{ label: "My Profile", to: "/women-profiles" },
		{ label: "Dates Tab", to: "/dates-tab" },
		{ label: "Like/Match", to: "/like-match-unmatched" },
		{ label: "My Membership", to: "/my-membership-women" },
	];

	return (
		<div className="horizontal-navbar ms-2 me-2 mb-4">
			{menuItems.map((item) => (
				<span key={item.to} className="menu-item">
					<Link
						to={item.to}
						className={
							isActive(item.to)
								? "active-link secondary-medium-font level-7"
								: "inactive-link secondary-medium-font level-7"
						}
					>
						{item.label}
					</Link>
				</span>
			))}
		</div>
	);
}

export default ProfileNavbar;
