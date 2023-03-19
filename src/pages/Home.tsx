import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import HomePage from "components/HomePage";
import { searchContext } from "context/SearchProvider";
import { IVideo } from "common/Interfaces";
import { useQuery } from "react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";

const Home = () => {
  const { state } = useContext(searchContext);
  const [search, setSearch] = useState<string>(state.search);

  const { data } = useQuery(
    ["videos", search],
    () =>
      customAxiosRequest(`${BASE_URL}/search?part=snippet&q=${state.search}`),
    { staleTime: 1000 * 60 * 10000 }
  );
  useEffect(() => {
    setSearch(state.search);
  }, [state.search]);

  console.log(search, "this is data");
  return (
    <>
      <Grid container spacing={1}>
        {
          // @ts-ignore

          data?.data?.items?.map((item: IVideo) => {
            return <HomePage key={item.snippet.title} videoProps={item} />;
          })
        }
      </Grid>
    </>
  );
};

export default Home;
