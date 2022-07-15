import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { NewsType } from "../../utils/reducers-state";
import { Toast } from "utils/functions";
import { actionCreators } from "../../state/index";

function EditNews() {
  const state = useSelector((state: any) => state.news);

  const dispatch = useDispatch();

  const { getNews, getAllNews } = bindActionCreators(actionCreators, dispatch);

  const [news, setNews] = useState<NewsType | any>();

  useEffect(() => {
    setNews(state.viewNews);
  }, [state.viewNews]);

  const Submit = (e: any) => {
    e.preventDefault();

    //find index number of news from array
    const newIndex = state.News.indexOf(state.viewNews);

    //update news object with new data
    const editedNews = (state.News[Number(`${newIndex}`)] = news);

    //dispatch new data to state

    getAllNews(state.News);
    getNews(editedNews);
    //store in localStorage
    localStorage.setItem("news", JSON.stringify(state.News));

    // @ts-expect-error
    $("#exampleModal").modal("hide");

    Toast.fire({
      text: "News Updated successfully",
      icon: "success",
    });
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
                  required
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
                  required
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
