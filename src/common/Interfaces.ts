export interface IImage {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnails {
  default: IImage;
  medium: IImage;
  high: IImage;
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

export interface IVideo {
  kind: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: ISnippet;
}
