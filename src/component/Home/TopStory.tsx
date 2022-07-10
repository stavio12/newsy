import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsType } from "utils/reducers-state";

function TopStory(props: { topStory: NewsType }) {
  const [img, setImg] = useState<string>("");
  useEffect(() => {
    if (props.topStory.metaData) {
      setImg(props.topStory?.metaData["media-metadata"][2].url);
    }
  }, [props.topStory.metaData]);

  return (
    <>
      <div className="col-12 col-md-4 col-lg-3 py-3">
        <Link to={`${props.topStory.id}`} className="text-dark ">
          <img
            src={
              img
                ? img
                : "https://bitsofco.de/content/images/2018/12/broken-1.png"
            }
            alt="news-img"
            className="img-fluid"
            style={{ width: "440px", height: "195px" }}
          />
          <div>
            <small className="text-secondary">
              {props.topStory.published_date}
            </small>
            <p className="h6 text-truncate d-block w-75 ">
              {props.topStory.title}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default TopStory;
