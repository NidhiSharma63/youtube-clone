import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import formatCounts from "utils/formatCounts";

import { IThumbnails } from "common/Interfaces";
interface IChannelIProps {
  ChannelInfoProps: {
    subscriberCount: string;
    description: string;
    videoCount: string;
    thumbnail: IThumbnails;
    title: string;
  };
}

const ChannelInfo = ({ ChannelInfoProps }: IChannelIProps) => {
  const [wordLength, setWordLength] = useState<number>(60);
  console.log(ChannelInfoProps.thumbnail.high.url);

  const hanldeWordLength = (): void => {
    setWordLength((prev) => {
      return prev === ChannelInfoProps.description.length
        ? 60
        : ChannelInfoProps.description.length;
    });
  };
  return (
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
          src={ChannelInfoProps.thumbnail.high.url}
          alt="banner"
          className="thumbnail-img"
        />
        <Box>
          <Typography variant="h6" sx={{ color: "secondary.main" }}>
            {ChannelInfoProps.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "secondary.dark" }}>
            {ChannelInfoProps.description.slice(0, wordLength)}
            {wordLength === 60 ? "..." : ""}
            {wordLength === ChannelInfoProps.description.length ? (
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
          <Typography variant="body1" sx={{ color: "secondary.dark" }}>
            {formatCounts(ChannelInfoProps.subscriberCount)} subscribers{" "}
            {formatCounts(ChannelInfoProps.videoCount)} views
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
  );
};

export default ChannelInfo;
