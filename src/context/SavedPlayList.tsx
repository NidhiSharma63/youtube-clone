import { createContext, useReducer } from "react";
import { IChildren } from "common/Interfaces";
import { setValueTOLS, getValueFromLS } from "utils/localstorage";
import { USER_PLAYLIST } from "constant/Misc";

interface IPlayListVideo {
  playListName: string;
  videoId: string[];
}

interface IInitialState {
  playListVideo: IPlayListVideo[];
}

const playListFromLS = getValueFromLS(USER_PLAYLIST);

const initialState: IInitialState = {
  playListVideo: playListFromLS
    ? JSON.parse(JSON.parse(playListFromLS).savedPlayListValueArray)
    : [{ playListName: "watch later", videoId: [] }],
};

interface IAction {
  type:
    | "videoAddToPlayList"
    | "createNewPlayList"
    | "removeVideoFromPlaylist"
    | "removePlayList";
  payload: { playListName: string; videoId: string };
}
interface MyContextValue {
  state: IInitialState;
  dispatch: React.Dispatch<{
    type:
      | "videoAddToPlayList"
      | "createNewPlayList"
      | "removeVideoFromPlaylist"
      | "removePlayList";
    payload: { playListName: string; videoId: string };
  }>;
}

export const PlayListVideoContext = createContext<MyContextValue>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IInitialState, action: IAction): IInitialState => {
  switch (action.type) {
    case "videoAddToPlayList": {
      const targetedPlaylistIndex = state.playListVideo.findIndex((item) => {
        return item.playListName === action.payload.playListName;
      });

      const targetedPlaylist = state.playListVideo[targetedPlaylistIndex];
      targetedPlaylist.videoId.push(action.payload.videoId);

      const newPlayListVideo = [
        ...state.playListVideo.slice(0, targetedPlaylistIndex),
        targetedPlaylist,
        ...state.playListVideo.slice(targetedPlaylistIndex + 1),
      ];
      setValueTOLS(USER_PLAYLIST, {
        savedPlayListValueArray: JSON.stringify(newPlayListVideo),
      });

      return {
        ...state,
        playListVideo: newPlayListVideo,
      };
    }
    case "createNewPlayList": {
      const newPlayList = [
        ...state.playListVideo,
        {
          playListName: action.payload.playListName,
          videoId: [action.payload.videoId],
        },
      ];
      setValueTOLS(USER_PLAYLIST, {
        savedPlayListValueArray: JSON.stringify(newPlayList),
      });
      return {
        ...state,
        playListVideo: newPlayList,
      };
    }
    case "removeVideoFromPlaylist": {
      const targetedPlaylistIndex = state.playListVideo.findIndex((item) => {
        return item.playListName === action.payload.playListName;
      });

      const targetedPlaylist = state.playListVideo[targetedPlaylistIndex];

      const indexToRemove = targetedPlaylist.videoId.indexOf(
        action.payload.videoId
      );
      if (indexToRemove !== -1) {
        targetedPlaylist.videoId.splice(indexToRemove, 1);
      }

      const newPlayListVideo = [
        ...state.playListVideo.slice(0, targetedPlaylistIndex),
        targetedPlaylist,
        ...state.playListVideo.slice(targetedPlaylistIndex + 1),
      ];
      setValueTOLS(USER_PLAYLIST, {
        savedPlayListValueArray: JSON.stringify(newPlayListVideo),
      });
      return {
        ...state,
        playListVideo: newPlayListVideo,
      };
    }
    default:
      return state;
  }
};

const SavedPlayListProvider = ({ children }: IChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PlayListVideoContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayListVideoContext.Provider>
  );
};

export default SavedPlayListProvider;
