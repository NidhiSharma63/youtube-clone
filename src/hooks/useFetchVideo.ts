import { useQuery } from "react-query";
import { BASE_URL } from "constant/Misc";
import customAxiosRequest from "hooks/useCustomAxios";

function useFetchVideo(search: string) {
  return useQuery(
    "videos",
    () => customAxiosRequest(`${BASE_URL}/${search}`),
    { staleTime: 1000 * 60 * 10000 } // 10 minutes in milliseconds
  );
}

export default useFetchVideo;
