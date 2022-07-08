import React from "react";
import { Link } from "react-router-dom";
import { NewsType } from "utils/reducers-state";

function TopStory(props: { topStory: NewsType }) {
  return (
    <>
      <div className="col-12 col-md-4 col-lg-3 py-3">
        <img
          src="https://via.placeholder.com/270x150"
          alt={props.topStory.title}
          className="img-fluid"
        />
        <div>
          <small className="text-secondary">
            {props.topStory.published_date}
          </small>
          <Link
            to="love/olo/1/"
            className="h6 text-truncate d-block w-75 text-dark text-decoration-none"
          >
            {props.topStory.title}
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopStory;
