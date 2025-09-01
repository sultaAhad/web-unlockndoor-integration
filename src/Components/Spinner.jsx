import React from "react";

const Spinner = () => {
  return (
    <div className="text-center py-5">
      <div className="btn-loader spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
