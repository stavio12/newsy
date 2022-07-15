import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { NewsType } from "../../utils/reducers-state";
import { actionCreators } from "../../state/index";
import { bindActionCreators } from "redux";

function ViewNews() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.news);
  const { getNews, getAllNews } = bindActionCreators(actionCreators, dispatch);
  const { id } = useParams();
  const [viewNews, setViewNews] = useState<NewsType>();

  useEffect(() => {
    if (id && state.News.length > 1) {
      // eslint-disable-next-line array-callback-return
      state.News.filter((news: NewsType) => {
        if (news.id === Number(id)) {
          setViewNews(news);
        }
      });
    }
  }, [state.News, id, state.viewNews]);

  const fireEditDelete = (id: number, type: string) => {
    //check if type is edit or delete
    if (type === "edit") {
      //dispatch data
      // @ts-expect-error
      getNews(viewNews);
    } else {
      //remove object(news) from array
      const deletedNews: any[] = state.News.filter(
        (newsItem: NewsType) => newsItem.id !== id
      );

      //dispatch new data into state
      // @ts-expect-error
      getAllNews(deletedNews);

      //store in localStorage
      localStorage.setItem("news", JSON.stringify(deletedNews));

      //navigate to home page
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="col-8 text-center mx-auto">
        <img
          src={
            viewNews?.metaData
              ? viewNews?.metaData["media-metadata"][2].url
              : "https://bitsofco.de/content/images/2018/12/broken-1.png"
          }
          alt="news-img"
          className="img-fluid"
          style={{ width: "700px", height: "400px" }}
        />
        <h1 className="pt-3">{viewNews?.title}</h1>
        <p>{viewNews?.abstract}</p>

        <div
          className="d-flex justify-content-center
        pt-5 gap-3 mx-auto"
        >
          <button
            onClick={(e) => fireEditDelete(Number(id), "edit")}
            className="btn px-5 btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit
          </button>
          <button
            onClick={(e) => fireEditDelete(Number(id), "delete")}
            className="btn px-5 btn-danger"
          >
            Delete
          </button>
        </div>
      </div>{" "}
    </>
  );
}

export default ViewNews;
