import { ReactNode } from "react";
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

export interface IComments {
  id: string;
  kind: string;
  snippet: {
    canReply: boolean;
    isPublic: boolean;
    totalReplyCount: number;
    videoId: string;
    topLevelComment: {
      id: string;
      kind: string;
      snippet: {
        authorChannelId: {
          value: string;
        };
        authorChannelUrl: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        canRate: boolean;
        likeCount: number;
        publishedAt: string;
        textDisplay: string;
        textOriginal: string;
        updatedAt: string;
        videoId: string;
        viewerRating: string;
      };
    };
  };
}

export interface IChildren {
  children: ReactNode;
}
