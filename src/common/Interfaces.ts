export interface IImage {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnails {
  default: IImage;
  medium: IImage;
  high: IImage;
  maxres?: IImage;
  standard?: IImage;
}

export interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface IId {
  kind: string;
  videoId: string;
}
export interface IVideo {
  kind: string;
  id: IId;
  snippet: ISnippet;
}
