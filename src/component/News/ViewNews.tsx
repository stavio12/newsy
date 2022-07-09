import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StateContext from "StateContext";
import DispatchContext from "DispatchContext";
import { NewsType } from "../../utils/reducers-state";

function ViewNews() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
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
  }, [appState, id]);

  const fireEditDelete = (id: number, type: string) => {
    //check if type is edit or delete
    if (type === "edit") {
      //dispatch data
      appDispatch({ type: "GET-NEWS", payload: viewNews });
    } else {
      //remove object(news) from array
      const deletedNews: any[] = appState.News.filter(
        (newsItem: NewsType) => newsItem.id !== id
      );

      //dispatch new data into state
      appDispatch({ type: "ALL-NEWS", payload: deletedNews });

      //store in localStorage
      localStorage.setItem("news", JSON.stringify(deletedNews));

      //navigate to home page
      window.location.href = "/";
    }
  };

  return (
    <>
      <div>
        <h1>{viewNews?.title}</h1>
        <p>{viewNews?.abstract}</p>

        <div className="col-8 d-flex gap-3 mx-auto">
          <button
            onClick={(e) => fireEditDelete(Number(id), "edit")}
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit
          </button>
          <button
            onClick={(e) => fireEditDelete(Number(id), "delete")}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>{" "}
    </>
  );
}

export default ViewNews;
