import { UserType } from "@/lib/definitions";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "user/pb";

export const fetchUserById = async (id: string): Promise<UserType> => {
  const res = await fetch(`${serviceURL}/${id}`, {
    method: "GET",
  });
  return await res.json();
};
