import React from "react";
import { Link, useLocation } from "react-router-dom";

function ProfileNavbartwo() {
	const location = useLocation();

	// Function to check if the link is active
	const isActive = (path) => location.pathname === path;

	const menuItems = [
    { label: "Female Members", to: "/female-members" },
		{ label: "My Profile", to: "/profile" },
		{ label: "Sponsored Dates", to: "/sponsored-dates" },
		{ label: "Matched Profiles", to: "/matched-profiles" },
		{ label: "My Membership", to: "/my-membership" },
	];

	return (
		<>
			<div className="horizontal-navbar ms-2 me-2 mb-4">
				{menuItems.map((item, index) => (
					<span key={item.to} className="menu-item">
						<Link
							to={item.to}
							className={
								isActive(item.to)
									? "active-link secondary-medium-font  level-7 "
									: "inactive-link secondary-medium-font  level-7"
							}
						>
							{item.label}
						</Link>
					</span>
				))}
			</div>
		</>
	);
}

export default ProfileNavbartwo;
