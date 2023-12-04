import axios, { AxiosResponse } from "axios";

interface IOptions {
  params: {
    regionCode: string;
    maxResults: string;
    pageToken: string;
  };
  headers: {
    "X-RapidAPI-Key": string | undefined;
    "X-RapidAPI-Host": string;
  };
}



// Promise<AxiosResponse> for resolve the promise
// if promise is rejected then it will return the error that is not the part of AxiosResponse
// Promise.reject(error) to solve the error

function customAxiosRequest(url: string,headersParams?:{"X-RapidAPI-Key":string|undefined,"X-RapidAPI-Host":string}): Promise<AxiosResponse> {

  const options: IOptions = {
    params: {
      regionCode: "IN",
      maxResults: "50",
      pageToken: "CDIQAA",
    },
    headers:headersParams?headersParams: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  try {
    const response = axios.get(url, options);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default customAxiosRequest;
