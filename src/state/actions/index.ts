import { NewsType } from "utils/reducers-state";

export const getAllNews = (news: NewsType) => {
  return (dispatch: any) => {
    dispatch({
      type: "ALL-NEWS",
      payload: news,
    });
  };
};

export const getQueryID = (id: number) => {
  return (dispatch: any) => {
    dispatch({
      type: "QUERY-ID",
      payload: id,
    });
  };
};

export const loader = (loading: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: "LOADER",
      payload: loading,
    });
  };
};

export const getNews = (news: NewsType) => {
  return (dispatch: any) => {
    dispatch({
      type: "GET-NEWS",
      payload: news,
    });
  };
};
