import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";

import "./App.css";

import Nav from "./Nav";
import Home from "component/Home";
import ViewNews from "component/News/ViewNews";
import EditNews from "component/News/EditNews";

import { actionCreators } from "./state/index";
import { NewsType } from "utils/reducers-state";

const App: React.FC = () => {
  const state = useSelector((state: any) => state.news);

  const dispatch = useDispatch();

  const { getAllNews, loader } = bindActionCreators(actionCreators, dispatch);

  const [id, setID] = useState(1);

  useEffect(() => {
    //check if localStorage has data
    if (localStorage.getItem("news")) {
      // @ts-expect-error
      const data: any = JSON.parse(localStorage.getItem("news"));

      loader(false);

      //set data into state
      getAllNews(data);
    } else {
      getNewsData(state.queryID);
    }

    //if state id is not equal to current id call news api function
    if (state.queryID !== id) {
      getNewsData(state.queryID);
      setID(state.queryID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.queryID, id]);

  const getNewsData = (id: number) => {
    axios
      .get(
        `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/${id}.json?api-key=${process.env.REACT_APP_API_KEY}`
      )
      .then(async (response) => {
        const news = await response.data.results;
        let newNewsData: NewsType[] = [];

        news.map((newsData: any) => {
          return newNewsData.push({
            title: newsData.title,
            id: newsData.id,
            abstract: newsData.abstract,
            metaData: newsData.media[0],
            published_date: newsData.published_date,
          });
        });
        loader(false);

        //Set data into local storage
        localStorage.setItem("news", JSON.stringify(newNewsData));

        //set data into state
        dispatch({ type: "ALL-NEWS", payload: newNewsData });
      });
  };

  return (
    <>
      <Nav />
      <div className="container position-relative pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id/" element={<ViewNews />} />
        </Routes>
      </div>
      <EditNews />
    </>
  );
};

export default App;
