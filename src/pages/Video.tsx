import { Box, Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IComments, ISnippet, IVideo } from "common/Interfaces";
import CoverVideoCard from "components/CoverVideoCard";
import VideoComments from "components/video/VideoComments";
import VideoDescription from "components/video/VideoDescription";
import VideoInfo from "components/video/VideoInfo";
import { BASE_URL } from "constant/Misc";
import customAxiosRequest from "constant/customAxiosRequest";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Loader from "components/Loader";

const headersParams = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
};
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
  isLoading: boolean;
}

interface ICommentsData {
  data?: IComments[];
}

interface ISuggestedVideo {
  data?: IVideo[];
}

const Video = () => {
  const { id } = useParams();
  const [channelId, setChannelId] = useState<string>("");
  const { data: videoData, isLoading }: IData = useQuery({
    queryKey: ["video", id],
    queryFn: () => customAxiosRequest(`${BASE_URL}/videos?part=snippet,statistic&id=${id}`),
    staleTime: Infinity,
    select: (AllVideos) => AllVideos.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: commentData }: ICommentsData = useQuery({
    queryKey: ["videoComments", id],
    queryFn: () => customAxiosRequest(`${BASE_URL}/commentThreads?part=snippet&videoId=${id}`),
    staleTime: Infinity,
    select: (videoComments) => videoComments.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (videoData) {
      setChannelId(videoData[0].snippet.channelId);
    }
  }, [videoData]);

  const { data: suggestVideo }: ISuggestedVideo = useQuery({
    queryKey: ["suggestedVideo", id],
    queryFn: () =>
      customAxiosRequest(`https://youtube-v138.p.rapidapi.com/video/related-contents/?id=${id}`, headersParams),
    staleTime: Infinity,
    select: (suggestedVideo) => suggestedVideo.data.contents,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  return (
    <Grid
      container
      mt={0.3}
      spacing={1}
      sx={{
        p: 0,
        justifyContent: "space-around",
      }}>
      <Grid item xs={12} custom={8}>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls width={"100%"} />
        <Typography gutterBottom variant="h5" color="secondary.main" mt={1}>
          {videoData?.[0].snippet.title}
        </Typography>

        {/* video info */}
        {videoData && (
          <VideoInfo
            videoProps={{
              channelTitle: videoData?.[0].snippet.channelTitle,
              likeCount: videoData?.[0].statistics.likeCount,
              channelId: channelId,
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

        <Box sx={{ display: { xs: "none", custom: "block" } }}>
          {commentData &&
            commentData.map((comment: IComments) => {
              return <VideoComments key={uuidv4()} commentsData={comment} />;
            })}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        custom={3.2}
        sx={{
          display: "flex",
          marginTop: "-1rem",
          alignItems: { custom: "center", xs: "flex-start" },
          flexDirection: "column",
          paddingRight: 0,
        }}>
        {suggestVideo
          ? suggestVideo.map((suggestion: IVideo) => {
              return <CoverVideoCard key={uuidv4()} videoProps={suggestion} width={{ maxWidth: 345 }} />;
            })
          : null}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: { custom: "none", xs: "block" },
        }}>
        <Divider />
        {commentData &&
          commentData.map((comment: IComments) => {
            return <VideoComments key={uuidv4()} commentsData={comment} />;
          })}
      </Grid>
    </Grid>
  );
};

export default Video;
