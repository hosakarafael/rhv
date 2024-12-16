"use server";
import { VideoType } from "@/lib/definitions";
import { isValidToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "video";

function verifyToken(token: string) {
  if (!isValidToken(token)) {
    redirect("/logout");
  }
}

export const like = async (userId: number, videoId: number, token: string) => {
  verifyToken(token);
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
  verifyToken(token);
  const res = await fetch(`${serviceURL}/unlike`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, videoId }),
  });
};
