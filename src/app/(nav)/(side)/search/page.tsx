"use client";
import { VideoType } from "@/lib/definitions";
import { searchVideos } from "@/services/publicVideoService";
import { SearchList } from "@/ui/search/SearchList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    async function init() {
      if (query) {
        const res = await searchVideos(query);
        setVideos(res);
      }
    }
    init();
  }, [query]);

  return (
    <div className="p-2">
      <SearchList videos={videos} />
    </div>
  );
}
