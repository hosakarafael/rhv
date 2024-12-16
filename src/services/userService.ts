"use server";
import { HistoryType, UserType } from "@/lib/definitions";
import { isValidToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "user";

function verifyToken(token: string) {
  if (!isValidToken(token)) {
    redirect("/logout");
  }
}

export const fetchUserByEmail = async (
  email: string,
  token: string
): Promise<UserType> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/email/${email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

export const fetchHistoryByUserId = async (
  userId: number,
  token: string
): Promise<HistoryType[]> => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/history/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

export const registerHistory = async (
  userId: number,
  videoId: number,
  token: string
) => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/history`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, videoId }),
  });
};

export const subscribe = async (
  subscriberId: number,
  creatorId: number,
  token: string
) => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/subscribe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscriberId, creatorId }),
  });
};

export const unsubscribe = async (
  subscriberId: number,
  creatorId: number,
  token: string
) => {
  verifyToken(token);
  const res = await fetch(`${serviceURL}/unsubscribe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscriberId, creatorId }),
  });
};
