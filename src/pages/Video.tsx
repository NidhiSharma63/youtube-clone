import { useParams } from "react-router-dom";
import customAxiosRequest from "constant/customAxiosRequest";
import { useQuery } from "react-query";
import { BASE_URL } from "constant/Misc";
import ReactPlayer from "react-player";
import { Typography, Box, Grid, Button } from "@mui/material";
import { ISnippet } from "common/Interfaces";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import formatLikes from "utils/formatLikes";

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

  console.log(data, "this is data");

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Box>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls />
          <Typography gutterBottom variant="h5" color="secondary.main" mt={1}>
            {data?.[0].snippet.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              border: "1px solid red",
            }}
          >
            {/*  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" color="secondary.main">
                {data?.[0].snippet.channelTitle}
              </Typography>
              <CheckCircleIcon
                sx={{ fontSize: ".9rem", ml: 1, color: "secondary.dark" }}
              />
              <Button
                variant="contained"
                color="info"
                sx={{ ml: 3, borderRadius: 5 }}
              >
                Subscribe
              </Button>
            </Box>
            {/*  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "#9c9a9a", borderRadius: 5 }}
                startIcon={<ThumbUpIcon />}
              >
                {data?.[0].statistics.likeCount &&
                  formatLikes(data?.[0].statistics.likeCount)}
              </Button>
            </Box>
            {/*  */}
          </Box>
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
