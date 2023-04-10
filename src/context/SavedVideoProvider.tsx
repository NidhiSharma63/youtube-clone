import { createContext, useReducer } from "react";

import { IChildren } from "common/Interfaces";
import { setValueTOLS, getValueFromLS } from "utils/localstorage";
import { SAVE_TO_PLAYLIST, SAVE_TO_WATCHLATER } from "constant/Misc";

interface IInitialState {
  saveToPlayelist: string[];
  saveToWatchLater: string[];
  playlistCreatedByUser: string[];
}

interface IAction {
  type:
    | "addToPlayList"
    | "addToWatchLater"
    | "removeFromPlayList"
    | "removeFromWatchLater"
    | "addPlayList";
  payload: { videoId: string; playListName?: string };
}
interface MyContextValue {
  state: IInitialState;
  dispatch: React.Dispatch<{
    type:
      | "addToPlayList"
      | "addToWatchLater"
      | "removeFromPlayList"
      | "removeFromWatchLater"
      | "addPlayList";
    payload: { videoId: string; playListName?: string };
  }>;
}

const getPlayListFromLS = getValueFromLS(SAVE_TO_PLAYLIST);
const getWatchLaterFromLS = getValueFromLS(SAVE_TO_WATCHLATER);

const initialState: IInitialState = {
  saveToPlayelist: getPlayListFromLS
    ? JSON.parse(getPlayListFromLS).savedPlayListValueArray
    : [],
  saveToWatchLater: getWatchLaterFromLS
    ? JSON.parse(getWatchLaterFromLS).savedPlayListValueArray
    : [],
  playlistCreatedByUser: [],
};

export const SavedVideoContext = createContext<MyContextValue>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IInitialState, action: IAction): IInitialState => {
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

      setValueTOLS(SAVE_TO_WATCHLATER, {
        savedPlayListValueArray: updatedValueOfWatchLater,
      });
      return {
        ...state,
        saveToWatchLater: updatedValueOfWatchLater,
      };

    case "removeFromPlayList":
      const afterRemovingVideoFromPlaylist = state.saveToPlayelist.filter(
        (item) => item !== action.payload.videoId
      );

      setValueTOLS(SAVE_TO_PLAYLIST, {
        savedPlayListValueArray: afterRemovingVideoFromPlaylist,
      });
      return {
        ...state,
        saveToPlayelist: afterRemovingVideoFromPlaylist,
      };

    case "removeFromWatchLater":
      const afterRemovingVideoFromWatchLater = state.saveToWatchLater.filter(
        (item) => item !== action.payload.videoId
      );

      setValueTOLS(SAVE_TO_WATCHLATER, {
        savedPlayListValueArray: afterRemovingVideoFromWatchLater,
      });
      return {
        ...state,
        saveToWatchLater: afterRemovingVideoFromWatchLater,
      };

    default:
      return state;
  }
};

const SavedVideoProvider = ({ children }: IChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SavedVideoContext.Provider value={{ state, dispatch }}>
      {children}
    </SavedVideoContext.Provider>
  );
};

export default SavedVideoProvider;
