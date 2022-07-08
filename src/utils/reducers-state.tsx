export interface Action<T> {
  type: T;
}
export interface NewsType {
  title: string | undefined;
  id: number | null;
  abstract: string | null;
  metaData: any | null;
  published_date: string | null;
}

export interface StateType {
  queryID: 1;
  News: NewsType;
}

export const initialState: StateType = {
  queryID: 1,

  News: {
    title: undefined,
    id: null,
    abstract: null,
    metaData: null,
    published_date: null,
  },
};

export interface StateAction extends Action<"ALL-NEWS" | "QUERY-ID"> {
  payload: {
    queryID: 1;
    News: NewsType;
  };
}

export const reducer = (
  state: StateType,
  action: any | StateAction
): StateType => {
  // eslint-disable-next-line
  switch (action.type) {
    case "ALL-NEWS":
      return { ...state, News: action.payload };
    case "QUERY-ID":
      return { ...state, queryID: action.payload };

    default:
      return state;
  }
};
