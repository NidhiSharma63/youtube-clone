import { useQuery } from "@tanstack/react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";

export const useFetchAllVideos = (nextPage: string, searchValue: string) => {
  // console.log(`${BASE_URL}/search?part=snippet&q=${searchValue}`, "url");

  return useQuery({
    queryKey: ["AllVideos", nextPage, searchValue],
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/search?part=snippet&q=${searchValue}`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (AllVideos: any) => AllVideos.data,
  });

  // return { data, isLoading, refetch };
};
