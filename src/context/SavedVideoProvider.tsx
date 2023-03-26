import { createContext, useReducer, useEffect } from "react";

import { IChildren } from "common/Interfaces";
import { setValueTOLS } from "utils/localstorage";
import { SAVE_TO_PLAYLIST, SAVE_TO_WATCHLATER } from "constant/Misc";

interface IInitialState {
  saveToPlayelist: string[];
  saveToWatchLater: string[];
}

interface IAction {
  type: "addToPlayList" | "addToWatchLater";
  payload: { videoId: string };
}
interface MyContextValue {
  state: IInitialState;
  dispatch: React.Dispatch<{
    type: "addToPlayList" | "addToWatchLater";
    payload: { videoId: string };
  }>;
}

const initialState: IInitialState = {
  saveToPlayelist: [],
  saveToWatchLater: [],
};

export const SavedVideoContext = createContext<MyContextValue>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IInitialState, action: IAction): IInitialState => {
  console.log(action.type, "tyep");
  switch (action.type) {
    case "addToPlayList":
      const updatedValueOfPlayList = [
        ...state.saveToPlayelist,
        action.payload.videoId,
      ];
      setValueTOLS(SAVE_TO_PLAYLIST, {
        savedPlayListValueArray: updatedValueOfPlayList,
      });
      return {
        ...state,
        saveToPlayelist: updatedValueOfPlayList,
      };
    case "addToWatchLater":
      const updatedValueOfWatchLater = [
        ...state.saveToWatchLater,
        action.payload.videoId,
      ];

      setValueTOLS(SAVE_TO_PLAYLIST, {
        savedPlayListValueArray: updatedValueOfWatchLater,
      });
      return {
        ...state,
        saveToWatchLater: updatedValueOfWatchLater,
      };

    default:
      return state;
  }
};

const SavedVideoProvider = ({ children }: IChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   const savedValueArray = state.saveToPlayelist;
  //   if (savedValueArray.length > 0) {
  //     setValueTOLS(SAVE_TO_PLAYLIST, {
  //       savedPlayListValueArray: savedValueArray,
  //     });
  //   }
  // }, [state.saveToPlayelist]);

  // useEffect(() => {
  //   const savedValueArray = state.saveToWatchLater;
  //   if (savedValueArray.length > 0) {
  //     setValueTOLS(SAVE_TO_WATCHLATER, {
  //       savedPlayListValueArray: savedValueArray,
  //     });
  //   }
  // }, [state.saveToWatchLater]);

  return (
    <SavedVideoContext.Provider value={{ state, dispatch }}>
      {children}
    </SavedVideoContext.Provider>
  );
};

export default SavedVideoProvider;
