import React, { useContext, useEffect, useState } from "react";
import StateContext from "StateContext";
import DispatchContext from "DispatchContext";
import { NewsType } from "../../utils/reducers-state";

function EditNews() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [news, setNews] = useState<NewsType | any>();

  useEffect(() => {
    setNews(appState.viewNews);
  }, [appState.viewNews]);

  const Submit = (e: any) => {
    e.preventDefault();
    const newIndex = appState.News.indexOf(appState.viewNews);
    const editedNews = (appState.News[Number(`${newIndex}`)] = news);
    appDispatch({ type: "ALL-NEWS", payload: appState.News });
    appDispatch({ type: "GET-NEWS", payload: editedNews });

    localStorage.setItem("news", JSON.stringify(appState.News));
    // @ts-expect-error
    $("#exampleModal").modal("hide");
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          {" "}
          <form onSubmit={Submit} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit News
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={news?.title}
                  onChange={(e) => setNews({ ...news, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Abstract{" "}
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  value={news?.abstract}
                  onChange={(e) =>
                    setNews({ ...news, abstract: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditNews;