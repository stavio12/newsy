import React, { useEffect, useState } from "react";
import TopStory from "./TopStory";
import { useSelector, useDispatch } from "react-redux";
import { NewsType } from "utils/reducers-state";
import { Link } from "react-router-dom";
import Loader from "component/Loader/Loader";
import { actionCreators } from "../../state/index";
import { bindActionCreators } from "redux";

function TopStories() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.news);
  const { loader, getQueryID } = bindActionCreators(actionCreators, dispatch);
  const [firstTwoNews, setFirstTwoNews] = useState([]);
  const [allNews, setAllNews] = useState([]);

  const pagination = [1, 7, 30];

  useEffect(() => {
    if (state.News.length >= 1) {
      setFirstTwoNews(state.News.slice(0, 2));
      setAllNews(state.News.slice(2));
    }
  }, [state.News, state.loader]);

  const activatePaginate = (id: number) => {
    //Clear storage and make way for new set of data
    localStorage.removeItem("news");
    //activate loader
    // appDispatch({ type: "LOADER", payload: true });
    loader(true);
    //dispatch id
    getQueryID(id);
    // appDispatch({ type: "QUERY-ID", payload: id });
  };

  return (
    <>
      <h1 className="text-start pb-3">Top Stories</h1>

      {state.loader && <Loader />}
      {!state.loader && (
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
                    state.queryID === paginate
                      ? "page-item active"
                      : "page-item"
                  }
                  onClick={(e) => activatePaginate(paginate)}
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
