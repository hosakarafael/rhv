"use server";
import { CommentType, Response, VideoType } from "@/lib/definitions";
import { isValidToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "video";

function verifyToken(token: string) {
  if (!isValidToken(token)) {
    redirect("/logout");
  }
}

export const fetchVideoById = async (
  id: string,
  token: string
): Promise<VideoType> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

export const createVideo = async (
  userId: number,
  title: string,
  description: string,
  visibility: string,
  videoFile: File,
  token: string
): Promise<Response> => {
  verifyToken(token);
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("userId", userId.toString());
  formData.append("visibility", visibility);
  formData.append("videoFile", videoFile);
  const res = await fetch(`${serviceURL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return await res.json();
};

export const deleteVideo = async (
  videoId: number,
  token: string
): Promise<Response> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/${videoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const editVideo = async (
  id: number,
  title: string,
  description: string,
  visibility: string,
  token: string
): Promise<Response> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, description, visibility }),
  });
  return await res.json();
};

export const fetchAllVideosByUserId = async (
  userId: number,
  token: string
): Promise<VideoType[]> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/user/${userId}`, {
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
): Promise<Response> => {
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
