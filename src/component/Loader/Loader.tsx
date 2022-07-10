import React from "react";

function Loader() {
  return (
    <>
      <div className="mx-auto text-center">
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span className="mx-2">Loading...</span>
      </div>
    </>
  );
}

export default Loader;
