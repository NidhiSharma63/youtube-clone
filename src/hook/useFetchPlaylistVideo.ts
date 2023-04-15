import customAxiosRequest from "constant/customAxiosRequest";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "constant/Misc";

import { useQueries } from "@tanstack/react-query";
import { PlayListVideoContext } from "context/SavedPlayList";

interface QueryResult {
  data: any;
  isLoading: boolean;
}
interface IPlayList {
  playListName: string;
  videoId: string[];
}
const useFetchPlaylistVideos = (playlist_name: string | undefined) => {
  const { state } = useContext(PlayListVideoContext);
  const [playList_Data, setPlayList_Data] = useState<IPlayList[]>(
    state.playListVideo
  );

  // console.log(state.playListVideo);

  useEffect(() => {
    if (playlist_name) {
      setPlayList_Data(() => {
        return state.playListVideo.filter(
          (item) => item.playListName === playlist_name
        );
      });
    }
  }, [playlist_name, state.playListVideo]);

  const userQueries = useQueries({
    queries:
      playList_Data[0].videoId &&
      playList_Data[0]?.videoId?.map((id: string) => {
        return {
          queryKey: ["playListVideo", id],
          queryFn: () =>
            customAxiosRequest(
              `${BASE_URL}/videos?part=snippet,statistic&id=${id}`
            ),
          select: (playListVideo: any) => playListVideo.data.items,
          refetchOnWindowFocus: false,
          staleTime: Infinity,
        };
      }),
  });

  let isLoading = false;

  const allVideso = userQueries?.map((item: QueryResult) => {
    isLoading = item.isLoading;

    return item?.data?.[0];
  });

  const newData = new Set(allVideso);
  const playlistData = Array.from(newData);

  return { playlistData, isLoading };
  // const name = "nihd";
  // return;
};

export default useFetchPlaylistVideos;
