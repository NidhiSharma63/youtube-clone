import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";
import { Grid, Box } from "@mui/material";
import banner from "images/banner2.jpg";
import { useState, useEffect } from "react";
import { ISnippet, IVideo } from "common/Interfaces";
import ChannelInfo from "components/channel/ChannelInfo";
import HomePage from "components/HomePage";
import { v4 as uuidv4 } from "uuid";

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
  const [channelVideoData, setChannelVideoData] = useState<IVideo[]>([]);
  const [positionVal, setPositionVal] = useState("relative");

  const { data: channelData }: IChannelData = useQuery({
    queryKey: ["channel", id],
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/channels?part=snippet&id=${id}`),
    staleTime: 1000 * 60 * 10000,
    select: (suggestedVideo) => suggestedVideo.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > 160) {
      setPositionVal("fixed");
    } else {
      setPositionVal("relative");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: channelVideo }: IChannelVideData = useQuery({
    queryKey: ["channelVideo", id],
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/search?part=snippet&channelId=${id}`),
    staleTime: 1000 * 60 * 10000,
    select: (suggestedVideo) => suggestedVideo.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (channelVideo) {
      setChannelVideoData(channelVideo);
    }
  }, [channelVideo]);

  console.log(positionVal, "posiyio ");
  return (
    <Grid container>
      {channelData
        ? channelData.map((item: any) => {
            return (
              <Grid
                item
                xs={12}
                sx={{
                  position: positionVal,
                  top: positionVal === "fixed" ? "-6rem" : 0,
                  width: "100%",
                  backgroundColor: "primary.main",
                  zIndex: 9,
                }}
              >
                <Box sx={{ height: "10rem" }}>
                  <img src={banner} alt="banner" className="banner-img" />
                </Box>
                <Grid item container>
                  <ChannelInfo
                    ChannelInfoProps={{
                      subscriberCount: item.statistics.subscriberCount,
                      description: item.snippet.localized.description,
                      videoCount: item.statistics.videoCount,
                      thumbnail: item.snippet.thumbnails,
                      title: item.snippet.title,
                    }}
                  />
                </Grid>
              </Grid>
            );
          })
        : null}
      <Grid
        item
        container
        sx={{
          marginTop: positionVal === "fixed" ? "20rem" : "0rem",
        }}
      >
        {channelVideoData?.map((item: IVideo) => {
          return <HomePage key={uuidv4()} videoProps={item} />;
        })}
      </Grid>
    </Grid>
  );
};

export default Channel;
