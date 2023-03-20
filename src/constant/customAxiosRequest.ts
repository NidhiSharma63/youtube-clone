import axios, { AxiosResponse } from "axios";

const options = {
  params: {
    regionCode: "IN",
    maxResults: "50",
    pageToken: "CDIQAA",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

// Promise<AxiosResponse> for resolve the promise
// if promise is rejected then it will return the error that is not the part of AxiosResponse
// Promise.reject(error) to solve the error

function customAxiosRequest(
  url: string,
  nextPageToken: string
): Promise<AxiosResponse> {
  try {
    console.log(url, "url");
    const response = axios.get(url, {
      params: {
        regionCode: "IN",
        maxResults: "50",
        pageToken: nextPageToken,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default customAxiosRequest;
