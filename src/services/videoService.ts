"use server";
import { CommentType, VideoType } from "@/lib/definitions";
import { isValidToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "video";

function verifyToken(token: string) {
  if (!isValidToken(token)) {
    redirect("/logout");
  }
}

export const fetchAllVideosByUserId = async (
  userId: number,
  token: string
): Promise<VideoType[]> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

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

export const createComment = async (
  userId: number,
  videoId: number,
  text: string,
  token: string
): Promise<CommentType> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/comment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, videoId, text }),
  });
  return await res.json();
};

export const deleteComment = async (
  commentId: number,
  token: string
): Promise<CommentType> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
