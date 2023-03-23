import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";
import { Grid, Box, Typography, Button } from "@mui/material";
import banner from "images/banner2.jpg";
import { useState } from "react";

import formatCounts from "utils/formatCounts";

import { ISnippet, IVideo } from "common/Interfaces";

interface IChannelDataSnippte extends ISnippet {
  localized: {
    description: string;
    title: string;
  };
  customUrl: string;
}

interface IChannelData {
  data?: {
    brandingSettings: {
      channel: {
        country: string;
        description: string;
        keywords: string;
        title: string;
        trackingAnalyticsAccountId: string;
        unsubscribedTrailer: string;
      };

      image: {
        bannerExternalUrl: string;
      };
    };
    contentDetails: {
      relatedPlaylists: {
        like: string;
        uploads: string;
      };
      id: string;
      kind: string;
    };
    snippet: IChannelDataSnippte;
    statistics: {
      hiddenSubscriberCount: boolean;
      subscriberCount: string;
      videoCount: string;
      viewCount: string;
    };
  }[];
}

interface IChannelVideData {
  data?: IVideo[];
}

const Channel = () => {
  const { id } = useParams();
  const [wordLength, setWordLength] = useState<number>(60);

  const { data: channelData }: IChannelData = useQuery({
    queryKey: ["channel", id],
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/channels?part=snippet&id=${id}`),
    staleTime: 1000 * 60 * 10000,
    select: (suggestedVideo) => suggestedVideo.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // console.log(channelData, "chnneldata");

  const { data: channelVideo }: IChannelVideData = useQuery({
    queryKey: ["channelVideo", id],
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/search?part=snippet&channelId=${id}`),
    staleTime: 1000 * 60 * 10000,
    select: (suggestedVideo) => suggestedVideo.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const hanldeWordLength = (): void => {
    if (channelData) {
      setWordLength((prev) => {
        return prev === channelData[0].snippet.localized.description.length
          ? 60
          : channelData[0].snippet.localized.description.length;
      });
    }
  };

  console.log(id, "thid is ");
  return (
    <Grid container>
      {channelData
        ? channelData.map((item: any) => {
            // console.log(item.);
            return (
              <>
                <Grid item xs={12} sx={{ height: "10rem" }}>
                  <img src={banner} alt="banner" className="banner-img" />
                </Grid>
                <Grid item container>
                  <Grid
                    item
                    direction={"row"}
                    xs={12}
                    sx={{
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        paddingTop: "1rem",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <img
                        src={item.snippet.thumbnails.high.url}
                        alt="banner"
                        className="thumbnail-img"
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ color: "secondary.main" }}
                        >
                          {item.snippet.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "secondary.dark" }}
                        >
                          {item.snippet.localized.description.slice(
                            0,
                            wordLength
                          )}
                          {wordLength === 60 ? "..." : ""}
                          {wordLength ===
                          item.snippet.localized.description.length ? (
                            <Button
                              variant="text"
                              sx={{ color: "secondary.main" }}
                              onClick={hanldeWordLength}
                            >
                              Show Less
                            </Button>
                          ) : (
                            <Button
                              variant="text"
                              sx={{ color: "secondary.main" }}
                              onClick={hanldeWordLength}
                            >
                              Show more
                            </Button>
                          )}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "secondary.dark" }}
                        >
                          {formatCounts(item.statistics.subscriberCount)}{" "}
                          subscribers {formatCounts(item.statistics.videoCount)}{" "}
                          views
                        </Typography>{" "}
                      </Box>
                    </Box>
                    <Box width="8rem">
                      <Button
                        variant="contained"
                        sx={{
                          ml: 3,
                          borderRadius: 5,
                          backgroundColor: "secondary.main",
                          color: "primary.main",
                        }}
                      >
                        Subscribe
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </>
            );
          })
        : null}
    </Grid>
  );
};

export default Channel;
