import React, { useContext, useEffect, useState } from "react";
import TopStory from "./TopStory";
import StateContext from "StateContext";
import { NewsType } from "utils/reducers-state";
import DispatchContext from "DispatchContext";
import { Link } from "react-router-dom";
import Loader from "component/Loader/Loader";

function TopStories() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [firstTwoNews, setFirstTwoNews] = useState([]);
  const [allNews, setAllNews] = useState([]);

  const pagination = [1, 7, 30];

  useEffect(() => {
    if (appState.News.length >= 1) {
      setFirstTwoNews(appState.News.slice(0, 2));
      setAllNews(appState.News.slice(2));
    }
  }, [appState.News, appState.loader]);

  return (
    <>
      <h1 className="text-start pb-3">Top Stories</h1>

      {appState.loader && <Loader />}
      {!appState.loader && (
        <div className="row mx-auto text-center">
          {firstTwoNews.map(({ title, published_date, id, metaData }) => (
            <div className="col-md-6 pt-3" key={id}>
              <div className="position-relative news-main-bg">
                <Link to={`${id}`} className="text-white">
                  <img
                    src={
                      metaData
                        ? // @ts-expect-error
                          metaData["media-metadata"][2].url
                        : "https://bitsofco.de/content/images/2018/12/broken-1.png"
                    }
                    alt="news-img"
                    className="img-fluid"
                    style={{ width: "700px", height: "400px" }}
                  />
                  <div className="position-absolute bottom-0 w-100 news-bg">
                    <h1>{title}</h1>
                    <small>{published_date}</small>
                  </div>
                </Link>
              </div>
            </div>
          ))}

          <div className="row pt-5">
            {allNews.map((news: NewsType) => (
              <TopStory topStory={news} key={news.id} />
            ))}
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {" "}
              <li className="page-item">
                <p className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </p>
              </li>
              {pagination.map((paginate) => (
                <li
                  key={paginate}
                  className={
                    appState.queryID === paginate
                      ? "page-item active"
                      : "page-item"
                  }
                  onClick={(e) =>
                    appDispatch({ type: "QUERY-ID", payload: paginate })
                  }
                >
                  <p className="page-link">{paginate}</p>
                </li>
              ))}
              <li className="page-item">
                <p className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </p>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default TopStories;
