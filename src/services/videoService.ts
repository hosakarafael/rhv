import { VideoType } from "@/lib/definitions";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "video";

export const like = async (userId: number, videoId: number, token: string) => {
  const res = await fetch(`${serviceURL}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, videoId }),
  });
};

export const unlike = async (
  userId: number,
  videoId: number,
  token: string
) => {
  const res = await fetch(`${serviceURL}/unlike`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, videoId }),
  });
};
