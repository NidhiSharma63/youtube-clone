import { useParams } from "react-router-dom";
import customAxiosRequest from "constant/customAxiosRequest";
import { useQuery } from "react-query";
import { BASE_URL } from "constant/Misc";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";

const Video = () => {
  const { id } = useParams();

  const { data } = useQuery({
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
    <div>
      vido
      <Box sx={{ width: "500px" }}>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
      </Box>
    </div>
  );
};

export default Video;
