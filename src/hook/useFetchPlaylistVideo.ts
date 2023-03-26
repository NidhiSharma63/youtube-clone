import customAxiosRequest from "constant/customAxiosRequest";
import { SavedVideoContext } from "context/SavedVideoProvider";
import { useContext } from "react";
import { BASE_URL } from "constant/Misc";

import { useQueries } from "@tanstack/react-query";

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
        select: (playListVideo: { data: { items: any[] } }) =>
          playListVideo.data.items,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      };
    }),
  });

  const allVideso = userQueries?.map((item) => {
    return item?.data?.[0];
  });
  console.log(allVideso, "allVideso");

  return { userQueries };
};

export default useFetchPlaylistVideos;
