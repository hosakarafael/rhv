import { VideoType } from "@/lib/definitions";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "video/pb";

export const fetchAllVideos = async (): Promise<VideoType[] | undefined> => {
  try {
    const res = await fetch(serviceURL, {
      method: "GET",
    });

    return await res.json();
  } catch (error) {}
};

export const fetchVideoById = async (id: string): Promise<VideoType> => {
  const res = await fetch(`${serviceURL}/${id}`, {
    method: "GET",
  });
  return await res.json();
};

export const increaseView = async (videoId: string) => {
  const resIp = await fetch("https://api.ipify.org?format=json");
  const data: { ip: string } = await resIp.json();

  const res = await fetch(`${serviceURL}/view`, {
    body: JSON.stringify({ ip: data.ip, videoId }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
