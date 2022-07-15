import { initialState } from "utils/reducers-state";

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ALL-NEWS":
      return { ...state, News: action.payload };
    case "QUERY-ID":
      return { ...state, queryID: action.payload };
    case "GET-NEWS":
      return { ...state, viewNews: action.payload };
    case "LOADER":
      return { ...state, loader: action.payload };
    default:
      return state;
  }
};

export default reducer;
