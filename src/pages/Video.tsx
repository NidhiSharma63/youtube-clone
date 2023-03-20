import { useParams } from "react-router-dom";
import customAxiosRequest from "constant/customAxiosRequest";
import { useQuery } from "react-query";
import { BASE_URL } from "constant/Misc";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { ISnippet } from "common/Interfaces";
import VideoInfo from "components/video/VideoInfo";
import VideoDescription from "components/video/VideoDescription";
import { IComments } from "common/Interfaces";
import VideoComments from "components/video/VideoComments";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CoverVideoCard from "components/CoverVideoCard";
import { IVideo } from "common/Interfaces";

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

interface ICommentsData {
  data?: IComments[];
}

interface ISuggestedVideo {
  data?: IVideo[];
}

const Video = () => {
  const { id } = useParams();
  const naigate = useNavigate();
  const { data: videoData }: IData = useQuery({
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

  const { data: commentData }: ICommentsData = useQuery({
    queryKey: ["videoComments", id],
    queryFn: () =>
      customAxiosRequest(
        `${BASE_URL}/commentThreads?part=snippet&videoId=${id}`,
        ""
      ),
    staleTime: 1000 * 60 * 10000,
    select: (videoComments) => videoComments.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: suggestVideo }: ISuggestedVideo = useQuery({
    queryKey: ["suggestedVideo", id],
    queryFn: () =>
      customAxiosRequest(
        `${BASE_URL}/search?part=snippet&relatedToVideoId=${id}&type=video`,
        ""
      ),
    staleTime: 1000 * 60 * 10000,
    select: (suggestedVideo) => suggestedVideo.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

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
            {videoData?.[0].snippet.title}
          </Typography>

          {/* video info */}
          {videoData && (
            <VideoInfo
              videoProps={{
                channelTitle: videoData?.[0].snippet.channelTitle,
                likeCount: videoData?.[0].statistics.likeCount,
              }}
            />
          )}
          {/*  video description */}
          {videoData && (
            <VideoDescription
              videoDescriptionProps={{
                description: videoData[0].snippet.description,
                viewCount: videoData[0].statistics.viewCount,
              }}
            />
          )}
          {commentData &&
            commentData.map((comment: IComments) => {
              return <VideoComments commentsData={comment} />;
            })}
        </Box>
        {/* <Typography variant="h1">THIS IS H1</Typography> */}
        <Stack></Stack>
      </Grid>
      <Grid item xs={5}>
        {suggestVideo
          ? suggestVideo.map((suggestion: IVideo) => {
              // <></>;
              return <CoverVideoCard videoProps={suggestion} />;
            })
          : null}
      </Grid>
    </Grid>
  );
};

export default Video;
