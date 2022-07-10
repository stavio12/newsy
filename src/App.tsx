import { useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { reducer, initialState, NewsType } from "./utils/reducers-state";
import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";
import Nav from "./Nav";
import Home from "component/Home";
import axios from "axios";
import ViewNews from "component/News/ViewNews";
import EditNews from "component/News/EditNews";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [id, setID] = useState(1);

  useEffect(() => {
    //check if localStorage has data
    if (localStorage.getItem("news")) {
      // @ts-expect-error
      const data: any = JSON.parse(localStorage.getItem("news"));

      dispatch({ type: "LOADER", payload: false });

      //set data into state
      dispatch({ type: "ALL-NEWS", payload: data });
    } else {
      getNewsData(state.queryID);
    }

    //if state id is not equal to current id call news api function
    if (state.queryID !== id) {
      getNewsData(state.queryID);
      setID(state.queryID);
    }
  }, [state.queryID, id]);

  const getNewsData = (id: number) => {
    axios
      .get(
        `http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/${id}.json?api-key=${process.env.REACT_APP_API_KEY}`
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

        dispatch({ type: "LOADER", payload: false });

        //Set data into local storage
        localStorage.setItem("news", JSON.stringify(newNewsData));

        //set data into state
        dispatch({ type: "ALL-NEWS", payload: newNewsData });
      });
  };

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Nav />
          <div className="container position-relative pt-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id/" element={<ViewNews />} />
            </Routes>
          </div>
          <EditNews />
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  );
};

export default App;
