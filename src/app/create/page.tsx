"use client";

import { Alert } from "@/components/Alert";
import { Logo } from "@/components/Logo";
import { useUser } from "@/context/userContext";
import { register } from "@/services/authService";
import { GuestMenu } from "@/ui/navbar/GuestMenu";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("CreatePage");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateToken, updateUser } = useUser();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const continueTo = searchParams.get("continueTo");

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!name) {
      setIsAlertVisible(true);
      setErrorMessage(t("errorNameEmpty"));
      setLoading(false);
      return;
    }

    if (!email) {
      setIsAlertVisible(true);
      setErrorMessage(t("errorEmailEmpty"));
      setLoading(false);
      return;
    }

    if (!password) {
      setIsAlertVisible(true);
      setErrorMessage(t("errorPasswordEmpty"));
      setLoading(false);
      return;
    }

    const res = await register(name, email, password);
    if (res.message) {
      setIsAlertVisible(true);
      setErrorMessage(res.message);
      setLoading(false);
      return;
    }

    localStorage.setItem("token", res.token);
    if (updateToken && updateUser) {
      updateToken(res.token);
      updateUser(res.user);
    }
    redirect("/");
  };

  const validate = () => {
    if (name.length == 0) {
      return false;
    }
    if (email.length == 0) {
      return false;
    }
    if (password.length == 0) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="absolute w-screen p-2">
        <div className="flex justify-between">
          <Logo />
          <GuestMenu />
        </div>
      </div>
      <div className="flex items-center h-screen justify-center gap-3 dark:text-white">
        <div className="flex flex-col gap-5 sm:flex-row">
          <h1 className="text-6xl">{t("title")}</h1>
          <form className="flex flex-col gap-1 w-96">
            <label className="form-control w-96">
              <div className="label">
                <span>{t("nameLabel")}</span>
              </div>
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
                  placeholder={t("namePlaceholder")}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </label>
            </label>
            <label className="form-control w-96">
              <div className="label">
                <span>{t("emailLabel")}</span>
              </div>
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
                  placeholder={t("emailPlaceholder")}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </label>
            <label className="form-control w-96">
              <div className="label">
                <span>{t("passwordLabel")}</span>
              </div>
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
                  placeholder={t("passwordPlaceholder")}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </label>

            <Alert
              show={isAlertVisible}
              type="error"
              message={errorMessage}
              onClose={() => setIsAlertVisible(false)}
            />
            <div className="flex justify-end gap-3 mt-3">
              <a
                href={continueTo ? `/login?continueTo=${continueTo}` : "/login"}
                className="btn btn-neutral dark:btn-outline text-xl dark:text-white rounded-full"
              >
                {t("backBtn")}
              </a>
              <button
                onClick={(e) => handleSubmit(e)}
                className="w-24 btn btn-accent text-xl text-white rounded-full"
                disabled={!validate() || loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  t("createBtn")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
