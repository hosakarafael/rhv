"use client";
import { isValidToken } from "@/lib/jwt";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextInterface {
  isLogged: boolean;
  updateToken: (token: string) => void;
  token: string;
}

const UserContext = createContext<Partial<UserContextInterface>>({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token && isValidToken(token)) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [token]);

  const updateToken = (token: string) => {
    setToken(token);
  };

  return (
    <UserContext.Provider
      value={{ isLogged, token, updateToken } as UserContextInterface}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
