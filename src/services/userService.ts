import { HistoryType, UserType } from "@/lib/definitions";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "user";

export const fetchUserByEmail = async (
  email: string,
  token: string
): Promise<UserType> => {
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
  videoId: string,
  token: string
) => {
  const res = await fetch(`${serviceURL}/history`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, videoId }),
  });
};
