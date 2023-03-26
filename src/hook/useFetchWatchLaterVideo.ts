import customAxiosRequest from "constant/customAxiosRequest";
import { SavedVideoContext } from "context/SavedVideoProvider";
import { useEffect, useState } from "react";
import { BASE_URL, SAVE_TO_WATCHLATER } from "constant/Misc";

import { useQueries } from "@tanstack/react-query";
import { getValueFromLS } from "utils/localstorage";
interface QueryResult {
  data: any;
  isLoading: boolean;
}

const useFetchWatchLaterVideos = () => {
  const getWatchLaterFromLs = getValueFromLS(SAVE_TO_WATCHLATER);
  const [videoIdArray, setVideoIdArray] = useState<string[]>([]);

  useEffect(() => {
    if (getWatchLaterFromLs) {
      const idArray = JSON.parse(getWatchLaterFromLs).savedPlayListValueArray;
      setVideoIdArray(idArray);
    }
  }, [getWatchLaterFromLs]);

  const userQueries = useQueries({
    queries: videoIdArray.map((id) => {
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
