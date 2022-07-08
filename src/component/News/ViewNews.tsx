import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StateContext from "StateContext";
import { NewsType } from "../../utils/reducers-state";
function ViewNews() {
  const appState = useContext(StateContext);
  const { id } = useParams();
  const [viewNews, setViewNews] = useState<NewsType>();

  useEffect(() => {
    if (id && appState.News.length > 1) {
      // eslint-disable-next-line array-callback-return
      appState.News.filter((news: NewsType) => {
        if (news.id === Number(id)) {
          setViewNews(news);
        }
      });
    }
  }, [appState.News, id]);

  return (
    <>
      <div>
        <h1>{viewNews?.title}</h1>
        <p>{viewNews?.abstract}</p>
      </div>{" "}
    </>
  );
}

export default ViewNews;
