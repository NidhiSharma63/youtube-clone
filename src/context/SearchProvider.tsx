import { createContext, useReducer } from "react";
import { IChildren } from "common/Interfaces";

interface IState {
  search: string;
  category: string;
}

interface IAction {
  type: "addSearch" | "addSearchCategory";
  payload: { value: string };
}

interface MyContextValue {
  state: IState;
  dispatch: React.Dispatch<{
    type: "addSearch" | "addSearchCategory";
    payload: { value: string };
  }>;
}

const initialState: IState = {
  search: "",
  category: "",
};

export const searchContext = createContext<MyContextValue>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "addSearch":
      return { ...state, search: action.payload.value };
    case "addSearchCategory":
      return { ...state, category: action.payload.value };
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
