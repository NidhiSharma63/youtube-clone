import { createContext, useReducer, ReactNode } from "react";

interface IState {
  search: string;
}

interface IAction {
  type: "addSearch";
  payload: { value: string };
}

interface MyContextValue {
  state: IState;
  dispatch: React.Dispatch<{
    type: "addSearch";
    payload: { value: string };
  }>;
}

interface IChildren {
  children: ReactNode;
}
const initialState: IState = {
  search: "",
};

export const searchContext = createContext<MyContextValue>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "addSearch":
      return { ...state, search: action.payload.value };
    default:
      return state;
  }
};

const SearchProvider = ({ children }: IChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <searchContext.Provider value={{ state, dispatch }}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchProvider;
