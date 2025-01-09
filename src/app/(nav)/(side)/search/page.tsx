"use client";
import { VideoType } from "@/lib/definitions";
import { searchVideos } from "@/services/publicVideoService";
import { SearchList } from "@/ui/search/SearchList";
import { SearchListSkeleton } from "@/ui/search/SearchListSkeleton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      setLoading(true);
      if (query) {
        const res = await searchVideos(query);
        setVideos(res);
      }
      setLoading(false);
    }
    init();
  }, [query]);

  return (
    <div className="p-2">
      {loading ? (
        <SearchListSkeleton renderCount={4} />
      ) : (
        <SearchList videos={videos} />
      )}
    </div>
  );
}
