import { VideoType } from "@/lib/definitions";
import { SearchCard } from "./SearchCard";

interface SearchListProps {
  videos: VideoType[];
}
export const SearchList = ({ videos }: SearchListProps) => {
  return videos.map((video) => <SearchCard key={video.id} video={video} />);
};
