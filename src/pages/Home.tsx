import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import HomePage from "components/HomePage";
import { searchContext } from "context/SearchProvider";
import { IVideo } from "common/Interfaces";
import { useQuery } from "react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

// sometimes data is undefined so we need to make all properties optional
interface IData {
  data?: {
    items?: IVideo[];
    kind?: string;
    nextPageToken?: string;
    pageInfo?: {
      resultsPerPage?: number;
      totalResults?: number;
    };
    regionCode?: "IN";
  };
}

const Home = () => {
  const { state } = useContext(searchContext);
  const [search, setSearch] = useState<string>(state.search);
  const [nextPage, setNextPage] = useState<string>("");

  const navigate = useNavigate();
  const [videos, setVideos] = useState<IVideo[]>([]);

  const queryFunction = () => {
    return customAxiosRequest(
      `${BASE_URL}/search?part=snippet&q=${state.search}`,
      nextPage
    );
  };

  const { data }: IData = useQuery({
    queryKey: ["videos", search, nextPage],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (videos) => videos.data,
  });

  useEffect(() => {
    // As data can be undefined so first need to check because videos can have onlye Array of IVideo
    setVideos((prev: IVideo[]) => {
      // If data.items is undefined, return the previous state
      if (!data?.items) {
        return prev;
      }

      // Otherwise, concatenate the new items to the previous state
      return [...prev, ...data.items];
    });
  }, [data?.items]);

  useEffect(() => {
    if (state.search) {
      setSearch(state.search);
      navigate(`/search?=${state.search}`);
    }
  }, [state.search, navigate]);

  // if user reaches at the end then set the next page token and it will refecth the data
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.target as HTMLDivElement;
    if (el.scrollTop + el.offsetHeight >= el.scrollHeight) {
      if (data?.nextPageToken) {
        setNextPage(data?.nextPageToken);
      }
    }
  };

  return (
    <>
      <Grid
        container
        onScroll={handleScroll}
        spacing={1}
        sx={{ height: "100vw", overflowY: "scroll", overflowX: "hidden" }}
      >
        {videos?.map((item: IVideo) => {
          return <HomePage key={uuidv4()} videoProps={item} />;
        })}
      </Grid>
    </>
  );
};

export default Home;
