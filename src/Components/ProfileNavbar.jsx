import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function ProfileNavbar() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const isActive = (path) => {
    if (path === "/woman/like-match") {
      return location.pathname === "/woman/like-match";
    }
    return location.pathname === path;
  };

  const menuItems = [
    { show: true, label: "My Profile", to: "/women-profiles" },
    {
      show: user?.package?.slug == "platinum-package",
      label: "Dates Tab",
      to: "/dates-tab",
    },
    { show: true, label: "Like/Match", to: "/woman/like-match" },
    { show: true, label: "My Membership", to: "/my-membership-women" },
  ];

  return (
    <div className="horizontal-navbar ms-2 me-2 mb-4">
      {menuItems.map((item) => (
        <>
          {item.show && (
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
          )}
        </>
      ))}
    </div>
  );
}

export default ProfileNavbar;
