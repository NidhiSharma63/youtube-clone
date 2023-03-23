import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import HomePage from "components/HomePage";
import { searchContext } from "context/SearchProvider";
import { IVideo } from "common/Interfaces";
import { useQuery } from "react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";

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
  isLoading: boolean;
}

const Home = () => {
  const { state } = useContext(searchContext);
  const [search, setSearch] = useState<string>(state.search);
  const [nextPage, setNextPage] = useState<string>("");

  const navigate = useNavigate();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);

  const queryFunction = () => {
    return customAxiosRequest(
      `${BASE_URL}/search?part=snippet&q=${state.search}`,
      nextPage
    );
  };

  const { data, isLoading }: IData = useQuery({
    queryKey: ["AllVideos", state.search, nextPage],
    queryFn: () =>
      customAxiosRequest(
        `${BASE_URL}/search?part=snippet&q=${state.search}`,
        nextPage
      ),
    // staleTime: 1000 * 60 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (AllVideos) => AllVideos.data,
  });

  useEffect(() => {
    // As data can be undefined so first need to check because videos can have onlye Array of IVideo
    setVideos((prev: IVideo[]) => {
      // console.log(
      //   "I SHOULD RUN BUT NOT MANUPLATE THE DATA-----------------",
      //   data?.items,
      //   prev
      // );

      // If data.items is undefined, return the previous state
      if (!data?.items) {
        return prev;
      }

      // Otherwise, concatenate the new items to the previous state
      return [...prev, ...data.items];
    });
  }, [data?.items]);

  useEffect(() => {
    // console.log(search, "setSearch");
    if (search.length !== 0) {
      // console.log("I SHOULD RUN ONLY-----------------");
      setVideos((val: IVideo[]) => {
        if (!data?.items) {
          return val;
        }
        return data?.items;
      });
    }
  }, [search, data]);

  useEffect(() => {
    if (state.search) {
      setSearch(state.search);
      navigate(`/search?=${state.search}`);
    }
    if (mainWrapperRef.current !== null) {
      mainWrapperRef.current.scrollTop = 0;
    }
  }, [state.search, navigate]);

  // if user reaches at the end then set the next page token and it will refecth the data
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const el = event.target as HTMLDivElement;
      if (el.scrollTop + el.offsetHeight >= el.scrollHeight - 130) {
        if (search.length > 0) {
          setSearch("");
        }
        // console.log("BY MISTAKE I EMPTY THE SEARCH VALUE-----------");
      }
      if (el.scrollTop + el.offsetHeight >= el.scrollHeight) {
        if (data?.nextPageToken) {
          setNextPage(data?.nextPageToken);
        }
      }
    },
    [data?.nextPageToken, search.length]
  );

  if (isLoading && videos.length === 0) return <Loader />;

  return (
    <>
      <Grid
        container
        onScroll={handleScroll}
        ref={mainWrapperRef}
        spacing={1}
        sx={{
          height: { xs: "auto", sm: "100vw" },
          overflowY: "scroll",
          overflowX: "hidden",
          justifyContent: "center",
        }}
      >
        {videos?.map((item: IVideo) => {
          return <HomePage key={uuidv4()} videoProps={item} />;
        })}
      </Grid>
    </>
  );
};

export default Home;
