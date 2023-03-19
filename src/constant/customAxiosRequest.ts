import axios from "axios";

const options = {
  params: {
    regionCode: "IN",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

function customAxiosRequest(url: string) {
  try {
    const response = axios.get(url, options);
    return response;
  } catch (error) {
    return error;
  }
}

export default customAxiosRequest;
