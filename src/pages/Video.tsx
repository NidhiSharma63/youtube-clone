import { useParams } from "react-router-dom";
import customAxiosRequest from "constant/customAxiosRequest";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "constant/Misc";
import ReactPlayer from "react-player";
import { Typography, Box, Grid, Divider } from "@mui/material";
import { ISnippet } from "common/Interfaces";
import VideoInfo from "components/video/VideoInfo";
import VideoDescription from "components/video/VideoDescription";
import { IComments } from "common/Interfaces";
import VideoComments from "components/video/VideoComments";
import CoverVideoCard from "components/CoverVideoCard";
import { IVideo } from "common/Interfaces";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

import Loader from "components/Loader";
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
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/videos?part=snippet,statistic&id=${id}`),
    staleTime: 1000 * 60 * 10000,
    select: (AllVideos) => AllVideos.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: commentData }: ICommentsData = useQuery({
    queryKey: ["videoComments", id],
    queryFn: () =>
      customAxiosRequest(
        `${BASE_URL}/commentThreads?part=snippet&videoId=${id}`
      ),
    staleTime: 1000 * 60 * 10000,
    select: (videoComments) => videoComments.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (videoData) {
      setChannelId(videoData[0].snippet.channelId);
    }
  }, [videoData]);

  console.log(channelId);

  const { data: suggestVideo }: ISuggestedVideo = useQuery({
    queryKey: ["suggestedVideo", id],
    queryFn: () =>
      customAxiosRequest(
        `${BASE_URL}/search?part=snippet&relatedToVideoId=${id}&type=video`
      ),
    staleTime: 1000 * 60 * 10000,
    select: (suggestedVideo) => suggestedVideo.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // const { data: channelData }: any = useQuery({
  //   queryKey: ["channel", channelId],
  //   queryFn: () =>
  //     customAxiosRequest(`${BASE_URL}/channels?part=snippet&id=${channelId}`),
  //   staleTime: 1000 * 60 * 10000,
  //   select: (suggestedVideo) => suggestedVideo.data.items,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  // });

  // console.log(channelData, "hhhhhhh");

  if (isLoading) return <Loader />;

  return (
    <Grid container spacing={1} mt={0.3}>
      <Grid item xs={12} custom={8}>
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
        <Box
          sx={{
            display: { custom: "block", xs: "none" },
          }}
        >
          {commentData &&
            commentData.map((comment: IComments) => {
              return <VideoComments commentsData={comment} />;
            })}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        custom={4}
        mt="-1rem"
        sx={{
          display: "flex",
          alignItems: { xs: "center", sm: "flex-start" },
          flexDirection: "column",
        }}
      >
        {suggestVideo
          ? suggestVideo.map((suggestion: IVideo) => {
              return (
                <CoverVideoCard
                  key={uuidv4()}
                  videoProps={suggestion}
                  width={{ width: 345 }}
                />
              );
            })
          : null}
      </Grid>
      <Grid item sx={{ display: { custom: "none", xs: "block" } }}>
        <Divider />
        {commentData &&
          commentData.map((comment: IComments) => {
            return <VideoComments commentsData={comment} />;
          })}
      </Grid>
    </Grid>
  );
};

export default Video;
