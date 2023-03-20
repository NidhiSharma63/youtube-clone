import { useParams } from "react-router-dom";
import customAxiosRequest from "constant/customAxiosRequest";
import { useQuery } from "react-query";
import { BASE_URL } from "constant/Misc";
import ReactPlayer from "react-player";
import { Typography, Box, Grid, Button } from "@mui/material";
import { ISnippet } from "common/Interfaces";
import formatCounts from "utils/formatCounts";
import VideoInfo from "components/video/VideoInfo";
import { useState } from "react";
import VideoDescription from "components/video/VideoDescription";

interface ISnippetVideo extends ISnippet {
  categoryId: string;
  defaultAudioLanguage: string;
  defaultLanguage: string;
  localized: {
    description: string;
    title: string;
  };
}

interface IData {
  data?: {
    contentDetails: {
      caption: string;
      contentRating: {};
      definition: string;
      dimension: string;
      duration: string;
      licensedContent?: boolean;
      projection: string;
    };
    kind: string;
    videoId: string;
    snippet: ISnippetVideo;
    statistics: {
      commentCount: string;
      favoriteCount: string;
      likeCount: string;
      viewCount: string;
    };
  }[];
}

const Video = () => {
  const { id } = useParams();

  const [wordLength, setWordLength] = useState<number>(60);
  const { data }: IData = useQuery({
    queryKey: ["video", id],
    queryFn: () =>
      customAxiosRequest(
        `${BASE_URL}/videos?part=snippet,statistic&id=${id}`,
        ""
      ),
    staleTime: 1000 * 60 * 10000,
    select: (AllVideos) => AllVideos.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const hanldeWordLength = (): void => {
    if (data) {
      setWordLength((prev) => {
        return prev === data[0].snippet.description.length
          ? 60
          : data[0].snippet.description.length;
      });
    }
  };

  console.log(data, "this is data");

  return (
    <Grid container spacing={1}>
      <Grid item xs={7}>
        <Box>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width={"100%"}
          />
          <Typography gutterBottom variant="h5" color="secondary.main" mt={1}>
            {data?.[0].snippet.title}
          </Typography>

          {/* video info */}
          {data && (
            <VideoInfo
              videoProps={{
                channelTitle: data?.[0].snippet.channelTitle,
                likeCount: data?.[0].statistics.likeCount,
              }}
            />
          )}
          {/*  video description */}
          {data && (
            <VideoDescription
              videoDescriptionProps={{
                description: data[0].snippet.description,
                viewCount: data[0].statistics.viewCount,
              }}
            />
          )}
        </Box>
        {/* <Typography variant="h1">THIS IS H1</Typography> */}
      </Grid>
      <Grid item xs={6}>
        this is item 6
      </Grid>
    </Grid>
  );
};

export default Video;
