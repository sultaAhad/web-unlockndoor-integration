import React from "react";

const BackgroundWrapper = ({ backgroundImage, children }) => {
	const styles = {
		backgroundImage: `url(${backgroundImage})`,
		zIndex: -1,
		width: "100%",
		backgroundPosition: "100% 100%",
		backgroundPosition: "cover",
		backgroundSize: "100% 100%",
		minHeight: "100vh",
		overflowX: "hidden",
		padding: 0,
		position: "relative",
	};

	return <div style={styles}>{children}</div>;
};

export default BackgroundWrapper;
