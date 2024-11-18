import { AuthenticationResponse } from "@/lib/definitions";

const serviceURL: string = process.env.NEXT_PUBLIC_API_URL + "auth";

export const authenticate = async (
  email: string,
  password: string
): Promise<AuthenticationResponse> => {
  const res = await fetch(`${serviceURL}/authenticate`, {
    body: JSON.stringify({ email, password }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};
