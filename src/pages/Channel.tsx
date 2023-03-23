import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";
import { Grid, Box } from "@mui/material";
import banner from "images/banner2.jpg";

const Channel = () => {
  const { id } = useParams();

  const { data: channelData }: any = useQuery({
    queryKey: ["channel", id],
    queryFn: () =>
      customAxiosRequest(`${BASE_URL}/channels?part=snippet&id=${id}`),
    staleTime: 1000 * 60 * 10000,
    select: (suggestedVideo) => suggestedVideo.data.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  console.log(channelData, "hhhhhhh");
  console.log(id, "thid is ");
  return (
    <Grid container>
      {channelData
        ? channelData.map((item: any) => {
            // console.log(item.);
            return (
              <>
                <Grid item xs={12} sx={{ height: "16rem" }}>
                  <img src={banner} alt="banner" className="banner-img" />
                </Grid>
              </>
            );
          })
        : null}
    </Grid>
  );
};

export default Channel;
