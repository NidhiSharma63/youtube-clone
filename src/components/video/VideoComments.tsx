import { Box, Stack, Button, Avatar, Typography } from "@mui/material";
import { IComments } from "common/Interfaces";
import { useState } from "react";

interface ICommentsDataProps {
  commentsData: IComments;
}

const VideoComments = ({ commentsData }: ICommentsDataProps) => {
  const [wordLength, setWordLength] = useState<number>(200);
  const [showMore, setShowMore] = useState<boolean>(false);

  const hanldeWordLength = (): void => {
    setWordLength((prev) => {
      return prev ===
        commentsData.snippet.topLevelComment.snippet.textDisplay.length
        ? 200
        : commentsData.snippet.topLevelComment.snippet.textDisplay.length;
    });
    setShowMore(true);
  };
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        gap: 2,
        mt: 3,
      }}
    >
      {" "}
      <Avatar
        alt="Remy Sharp"
        src={commentsData.snippet.topLevelComment.snippet.authorProfileImageUrl}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          // gap: 1,
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ color: "secondary.main" }}>
            {commentsData.snippet.topLevelComment.snippet.authorDisplayName}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "secondary.main" }}>
          {commentsData.snippet.topLevelComment.snippet.textDisplay.slice(
            0,
            wordLength
          )}

          {wordLength <=
            commentsData.snippet.topLevelComment.snippet.textDisplay.length &&
          !showMore ? (
            <Button
              variant="text"
              sx={{ color: "secondary.main" }}
              onClick={hanldeWordLength}
            >
              Show more
            </Button>
          ) : null}
          {showMore ? (
            <Button
              variant="text"
              sx={{ color: "secondary.main" }}
              onClick={hanldeWordLength}
            >
              Show less
            </Button>
          ) : null}
        </Typography>
      </Box>
    </Stack>
  );
};

export default VideoComments;
