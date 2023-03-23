import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";
import { Grid, Box, Typography, Button } from "@mui/material";
import banner from "images/banner2.jpg";
import { useState, useEffect } from "react";

import formatCounts from "utils/formatCounts";

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

  useEffect(() => {
    if (channelVideo) {
      setChannelVideoData(channelVideo);
    }
    // setChannelVideoData(channelVideo.)
  }, [channelVideo]);

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
              </>
            );
          })
        : null}
      {channelVideoData?.map((item: IVideo) => {
        return <HomePage key={uuidv4()} videoProps={item} />;
      })}
    </Grid>
  );
};

export default Channel;