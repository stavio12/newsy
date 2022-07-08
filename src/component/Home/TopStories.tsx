import React, { useContext, useEffect, useState } from "react";
import TopStory from "./TopStory";
import StateContext from "StateContext";
import { NewsType } from "utils/reducers-state";
import DispatchContext from "DispatchContext";

function TopStories() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [newsData, setNewsData] = useState([]);

  const pagination = [1, 7, 30];

  useEffect(() => {
    if (appState.News.length >= 1) {
      setNewsData(appState.News);
    }
    console.log(appState.News);
  }, [appState.News, newsData]);

  return (
    <>
      <div className="row mx-auto text-center">
        <h1>Top Stories</h1>
        <div className="col-6">
          <img
            src="https://via.placeholder.com/700x400"
            alt=""
            className="img-fluid"
          />
        </div>
        <div className="col-6">
          <img
            src="https://via.placeholder.com/700x400"
            alt=""
            className="img-fluid"
          />
        </div>
        <div className="row pt-5">
          {newsData.map((news: NewsType) => (
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
                className="page-item"
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
    </>
  );
}

export default TopStories;
