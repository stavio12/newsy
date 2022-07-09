import React from "react";

import StateContext from "StateContext";
import DispatchContext from "DispatchContext";
import { NewsType } from "./reducers-state";

// eslint-disable-next-line react-hooks/rules-of-hooks
const appState = React.useContext(StateContext);
// eslint-disable-next-line react-hooks/rules-of-hooks
const appDispatch = React.useContext(DispatchContext);

export const fireEditDelete = (
  id: number,
  type: string,
  viewNews: NewsType | any
) => {
  if (type === "edit") {
    appDispatch({ type: "GET-NEWS", payload: viewNews });
  } else {
    const deletedNews: any[] = appState.News.filter(
      (newsItem: NewsType) => newsItem.id !== id
    );

    appDispatch({ type: "ALL-NEWS", payload: deletedNews });
    localStorage.setItem("news", JSON.stringify(deletedNews));
    window.location.href = "/";
  }
};
