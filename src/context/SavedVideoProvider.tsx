import { createContext, useReducer, useEffect } from "react";

import { IChildren } from "common/Interfaces";
import { getValueFromLS, setValueTOLS } from "utils/localstorage";
import { SAVE_TO_PLAYLIST, SAVE_TO_WATCHLATER } from "constant/Misc";

interface IInitialState {
  saveToPlayelist: string[];
  saveToWatchLater: string[];
}

interface IAction {
  type:
    | "addToPlayList"
    | "addToWatchLater"
    | "removeFromPlayList"
    | "removeFromWatchLater";
  payload: { videoId: string };
}
interface MyContextValue {
  state: IInitialState;
  dispatch: React.Dispatch<{
    type:
      | "addToPlayList"
      | "addToWatchLater"
      | "removeFromPlayList"
      | "removeFromWatchLater";
    payload: { videoId: string };
  }>;
}

const playListGetValueFromLS = getValueFromLS(SAVE_TO_PLAYLIST);
const watchLaterGetValueFromLs = getValueFromLS(SAVE_TO_WATCHLATER);

const initialState: IInitialState = {
  saveToPlayelist: playListGetValueFromLS
    ? JSON.parse(playListGetValueFromLS).savedPlayListValueArray
    : [],
  saveToWatchLater: watchLaterGetValueFromLs
    ? JSON.parse(watchLaterGetValueFromLs).savedPlayListValueArray
    : [],
};

export const SavedVideoContext = createContext<MyContextValue>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IInitialState, action: IAction): IInitialState => {
  console.log(action.type, "tyep");
  switch (action.type) {
    case "addToPlayList":
      return {
        ...state,
        saveToPlayelist: [...state.saveToPlayelist, action.payload.videoId],
      };
    case "addToWatchLater":
      return {
        ...state,
        saveToWatchLater: [...state.saveToWatchLater, action.payload.videoId],
      };
    case "removeFromPlayList":
      return {
        ...state,
        saveToPlayelist: state.saveToPlayelist.filter(
          (item) => item !== action.payload.videoId
        ),
      };
    case "removeFromWatchLater":
      // setValueTOLS()
      return {
        ...state,
        saveToWatchLater: state.saveToWatchLater.filter(
          (item) => item !== action.payload.videoId
        ),
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

  useEffect(() => {
    const savedValueArray = state.saveToWatchLater;
    if (savedValueArray.length > 0) {
      setValueTOLS(SAVE_TO_WATCHLATER, {
        savedPlayListValueArray: savedValueArray,
      });
    }
  }, [state.saveToWatchLater]);

  return (
    <SavedVideoContext.Provider value={{ state, dispatch }}>
      {children}
    </SavedVideoContext.Provider>
  );
};

export default SavedVideoProvider;
