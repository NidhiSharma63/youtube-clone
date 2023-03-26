import customAxiosRequest from "constant/customAxiosRequest";
import { useContext } from "react";
import { BASE_URL } from "constant/Misc";

import { useQueries } from "@tanstack/react-query";
import { SavedVideoContext } from "context/SavedVideoProvider";

interface QueryResult {
  data: any;
  isLoading: boolean;
}

const useFetchPlaylistVideos = () => {
  const { state } = useContext(SavedVideoContext);

  const userQueries = useQueries({
    queries: state.saveToPlayelist.map((id) => {
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
};

export default useFetchPlaylistVideos;
