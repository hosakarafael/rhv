"use client";
import { UserType } from "@/lib/definitions";
import { getSubjectFromToken, isValidToken } from "@/lib/jwt";
import { fetchUserByEmail } from "@/services/userService";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextInterface {
  updateToken: (token: string) => void;
  token: string;
  user: UserType;
  updateUser: (user: UserType | null) => void;
  loadingUser: boolean;
}

const UserContext = createContext<Partial<UserContextInterface>>({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserType | undefined | null>(undefined);
  const [loadingUser, setLoadingUser] = useState(true);

  async function getUser() {
    if (token) {
      const email = getSubjectFromToken(token);
      if (email) {
        setUser(await fetchUserByEmail(email, token));
        setLoadingUser(false);
      }
    }
  }

  useEffect(() => {
    setLoadingUser(true);
    if (token && isValidToken(token)) {
      getUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  const updateToken = (token: string) => {
    setToken(token);
  };

  const updateUser = (user: UserType) => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={
        {
          token,
          updateToken,
          user,
          updateUser,
          loadingUser,
        } as UserContextInterface
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
