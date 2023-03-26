import customAxiosRequest from "constant/customAxiosRequest";
import { SavedVideoContext } from "context/SavedVideoProvider";
import { useContext } from "react";
import { BASE_URL } from "constant/Misc";

import { useQueries } from "@tanstack/react-query";
interface QueryResult {
  data: any;
  isLoading: boolean;
}

const useFetchWatchLaterVideos = () => {
  const { state } = useContext(SavedVideoContext);

  const userQueries = useQueries({
    queries: state.saveToWatchLater.map((id) => {
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
  const watchLaterVideo = Array.from(newData);

  return { watchLaterVideo, isLoading };
};

export default useFetchWatchLaterVideos;
