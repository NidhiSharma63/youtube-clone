import { Grid } from "@mui/material";
import { IVideo } from "common/Interfaces";
import HomePage from "components/HomePage";
import Loader from "components/Loader";
import { searchContext } from "context/SearchProvider";
import { useFetchAllVideos } from "hook/useFetchAllVideos";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const { state } = useContext(searchContext);
  const [search, setSearch] = useState<string>(state.search);
  const [nextPage, setNextPage] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (state.search.length > 0) {
      // console.log("I RUNG SEARCH", state.search);
      setSearchValue(state.search);
      navigate(`/search?=${state.search}`);
    }

    if (state.category.length > 0) {
      navigate(`/category?=${state.category}`);

      setSearchValue(state.category);
    }
  }, [state.category, state.search, navigate]);

  const { data, isLoading } = useFetchAllVideos(nextPage, searchValue);

  // console.log(isLoading, "this is loading");
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
    if (window.location.pathname === "/" && state.category.length === 0) {
      setSearchValue("");
    }
    if (window.location.pathname === "/" && state.search.length === 0) {
      setSearchValue("");
    }
  }, [state.category, state.search]);

  useEffect(() => {
    // console.log(search, "setSearch");
    if (searchValue.length !== 0) {
      // console.log("I SHOULD RUN ONLY-----------------");
      setVideos((val: IVideo[]) => {
        if (!data?.items) {
          return val;
        }
        return data?.items;
      });
    }
    if (window.location.pathname === "/" && state.category.length === 0) {
      setVideos((val: IVideo[]) => {
        if (!data?.items) {
          return val;
        }
        return data?.items;
      });
    }
    if (window.location.pathname === "/" && state.search.length === 0) {
      setVideos((val: IVideo[]) => {
        if (!data?.items) {
          return val;
        }
        return data?.items;
      });
    }
  }, [searchValue, data, state.category, state.search]);

  //  if user reaches at the end then set the next page token and it will refecth the data
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
  if (isLoading && searchValue.length > 0) return <Loader />;

  return (
    <>
      <Grid
        container
        onScroll={handleScroll}
        ref={mainWrapperRef}
        spacing={1}
        sx={{
          height: { xs: "auto", custom: "100vw" },
          overflowY: "scroll",
          overflowX: "hidden",
          justifyContent: "center",
        }}>
        {videos?.map((item: IVideo) => {
          return <HomePage key={uuidv4()} videoProps={item} />;
        })}
      </Grid>
    </>
  );
};

export default Home;
