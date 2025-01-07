"use server";
import { VideoType } from "@/lib/definitions";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "video/pb";

export const fetchAllPublicVideos = async (): Promise<VideoType[]> => {
  const res = await fetch(serviceURL, {
    method: "GET",
  });

  return await res.json();
};

export const fetchVideoByIdAndPublic = async (
  id: string
): Promise<VideoType> => {
  const res = await fetch(`${serviceURL}/${id}`, {
    method: "GET",
  });

  return await res.json();
};

export const increaseView = async (videoId: number) => {
  const resIp = await fetch("https://api.ipify.org?format=json");
  const data: { ip: string } = await resIp.json();

  const res = await fetch(`${serviceURL}/view`, {
    //use data.ip to get IP - now is using random number
    body: JSON.stringify({ ip: Math.floor(Math.random() * 1001), videoId }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchByUserIdsAndPublic = async (
  ids: number[]
): Promise<VideoType[]> => {
  const res = await fetch(`${serviceURL}/user-ids`, {
    method: "POST",
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const searchVideos = async (query: string): Promise<VideoType[]> => {
  const res = await fetch(`${serviceURL}/search/${query}`, {
    method: "GET",
  });

  return await res.json();
};
