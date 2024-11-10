import { Video } from "@/lib/definitions";

const serviceURL: string = process.env.VIDEO_SERVICE_API_URL + "video";

export const fetchAllVideos = async (): Promise<Video[]> => {
  const res = await fetch(serviceURL, { method: "GET" });
  return await res.json();
};

export const fetchVideoById = async (id: string): Promise<Video> => {
  const res = await fetch(`${serviceURL}/${id}`, { method: "GET" });
  return await res.json();
};
