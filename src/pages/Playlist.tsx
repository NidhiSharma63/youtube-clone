import { useContext, useEffect, useState } from "react";
import { SavedVideoContext } from "context/SavedVideoProvider";
import { Box, Grid } from "@mui/material";
import useFetchPlaylistVideos from "hook/useFetchPlaylistVideo";
import { IVideo } from "common/Interfaces";

interface IItems {
  items: IVideo[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  }[];
}

const Playlist = () => {
  const { state } = useContext(SavedVideoContext);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const {} = useFetchPlaylistVideos();

  // useEffect(() => {
  //   const videosData = userQueries.map((item) => {
  //     return item.data;
  //   });

  //   const videosArray = videosData.map((item) => {
  //     // console.log(item?.items, "video item");
  //     if (item) {
  //       return item?.items;
  //     }
  //     // return item
  //     return "name";
  //   });
  //   // setVideos(videosArray);
  // }, [userQueries]);

  // useEffect(() => {
  //   const videosArray =
  // }, []);

  return <div>Playlist</div>;
};

export default Playlist;
