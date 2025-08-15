import React from "react";

const Pagination = () => {
	return (
		<div className="pagination-container d-flex align-items-center mb-4 wrapper-pagination">
			{/* Previous Button */}
			<button className="btn btn-outline-primary" disabled>
				<i className="fas fa-chevron-left"></i>
			</button>

			{/* Pagination Numbers */}
			<ul className="pagination list-unstyled d-flex  align-items-center mb-0">
				<li className="page-item active">
					<button className="btn btn-outline-secondary mx-1">1</button>
				</li>
				<li className="page-item">
					<button className="btn btn-outline-secondary mx-1">2</button>
				</li>
				<li className="page-item">
					<button className="btn btn-outline-secondary mx-1">3</button>
				</li>
				<li className="page-item">
					<button className="btn btn-outline-secondary mx-1">4</button>
				</li>
			</ul>

			{/* Next Button */}
			<button className="btn arrow ">
				<i className="fas fa-chevron-right"></i>
			</button>
		</div>
	);
};

export default Pagination;
