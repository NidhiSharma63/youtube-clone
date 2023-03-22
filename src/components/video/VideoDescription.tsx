import { Typography, Box, Grid, Button } from "@mui/material";
import formatCounts from "utils/formatCounts";

import { useState } from "react";

interface IVideoDescriptionProps {
  videoDescriptionProps: {
    description: string;
    viewCount: string;
  };
}
const VideoDescription = ({
  videoDescriptionProps,
}: IVideoDescriptionProps) => {
  const [wordLength, setWordLength] = useState<number>(60);

  const hanldeWordLength = (): void => {
    setWordLength((prev) => {
      return prev === videoDescriptionProps.description.length
        ? 60
        : videoDescriptionProps.description.length;
    });
  };
  return (
    <Box
      sx={{
        backgroundColor: "info.main",
        borderRadius: 2,
        padding: 0.4,
      }}
    >
      <Typography
        gutterBottom
        variant="subtitle1"
        color="secondary.main"
        mt={1}
      >
        {formatCounts(videoDescriptionProps.viewCount)} views
      </Typography>
      <Typography gutterBottom variant="subtitle1" color="secondary.main">
        {videoDescriptionProps.description.slice(0, wordLength)}
        {wordLength === 60 ? "..." : ""}
      </Typography>
      {wordLength === videoDescriptionProps.description.length ? (
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
    </Box>
  );
};

export default VideoDescription;
