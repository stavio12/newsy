import { combineReducers } from "redux";
import newsReducer from "./newsReducer";

const reducers = combineReducers({
  news: newsReducer,
});

export default reducers;
