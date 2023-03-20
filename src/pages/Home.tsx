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

const Home = () => {
  const { state } = useContext(searchContext);
  const [search, setSearch] = useState<string>(state.search);

  const navigate = useNavigate();

  const { data }: any = useQuery({
    queryKey: ["videos", search],
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/search?part=snippet&q=${state.search}`),
    staleTime: 1000 * 60 * 10000,
  });

  useEffect(() => {
    if (state.search) {
      setSearch(state.search);
      navigate(`/search?=${state.search}`);
    }
  }, [state.search, navigate]);

  return (
    <>
      <Grid container spacing={1}>
        {data?.data?.items?.map((item: IVideo) => {
          return <HomePage key={uuidv4()} videoProps={item} />;
        })}
      </Grid>
    </>
  );
};

export default Home;
