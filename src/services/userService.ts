import { UserType } from "@/lib/definitions";

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
