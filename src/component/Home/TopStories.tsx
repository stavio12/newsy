import React, { useContext, useEffect, useState } from "react";
import TopStory from "./TopStory";
import StateContext from "StateContext";
import { NewsType } from "utils/reducers-state";

function TopStories() {
  const appState = useContext(StateContext);

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    if (appState.News.length >= 1) {
      setNewsData(appState.News);
    }
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
      </div>
    </>
  );
}

export default TopStories;
