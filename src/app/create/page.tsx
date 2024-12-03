"use client";

import { Alert } from "@/components/Alert";
import { Logo } from "@/components/Logo";
import { useUser } from "@/context/userContext";
import { register } from "@/services/authService";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateToken, updateUser } = useUser();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setIsAlertVisible(true);
      setErrorMessage("Channel name cannot be empty");
      return;
    }

    if (!email) {
      setIsAlertVisible(true);
      setErrorMessage("Email cannot be empty");
      return;
    }

    if (!password) {
      setIsAlertVisible(true);
      setErrorMessage("Password cannot be empty");
      return;
    }

    const res = await register(name, email, password);
    if (res.message) {
      setIsAlertVisible(true);
      setErrorMessage(res.message);
      return;
    }

    localStorage.setItem("token", res.token);
    if (updateToken && updateUser) {
      updateToken(res.token);
      updateUser(res.user);
    }
    redirect("/");
  };

  return (
    <div className="p-2">
      <Logo />
      <div className="flex items-center h-screen justify-center gap-3">
        <div className="flex flex-col gap-5 sm:flex-row">
          <h1 className="text-6xl">Create</h1>
          <form className="flex flex-col gap-4 w-96">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Channel name"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Alert show={isAlertVisible} type="error" message={errorMessage} />
            <div className="flex justify-end gap-3">
              <a
                href={"/login"}
                className="btn btn-outline text-xl text-white rounded-full"
              >
                Login
              </a>
              <button
                onClick={(e) => handleSubmit(e)}
                className="btn btn-accent text-xl text-white rounded-full"
              >
                Create Channel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
