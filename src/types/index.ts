export type Theme = "light" | "dark";

export type CanidatesType = {
  url: string;
  width: number;
  height: number;
};

type VideoVersionType = {
  type: number;
  url: string;
};

export type IMedia = {
  id: string;
  has_audio: boolean;
  image_versions2: CanidatesType[];
  original_height: number;
  original_width: number;
  video_versions: VideoVersionType[];
};
