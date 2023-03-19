import { Box, Grid } from "@mui/material";
import HomePage from "components/HomePage";
import useFetchVideo from "hooks/useFetchVideo";
import { useState } from "react";

import { IVideo } from "common/Interfaces";
import { AxiosResponse } from "axios";

const Home = () => {
  const { data } = useFetchVideo("search?part=snippet");
  console.log(data, "this is data");

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
