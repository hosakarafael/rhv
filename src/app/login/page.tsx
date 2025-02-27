"use client";

import { Alert } from "@/components/Alert";
import { Logo } from "@/components/Logo";
import { useUser } from "@/context/userContext";
import { authenticate } from "@/services/authService";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GuestMenu } from "@/ui/navbar/GuestMenu";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page() {
  const t = useTranslations("LoginPage");
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

    const res = await authenticate(email, password);
    if (res.message) {
      setIsAlertVisible(true);

      switch (res.errorCode) {
        case "AS001":
          setErrorMessage(t("errorIncorrectEmailOrPassword"));
          break;
        case "AS002":
          setErrorMessage(t("errorEmailEmpty"));
          break;
        case "AS003":
          setErrorMessage(t("errorPasswordEmpty"));
          break;
        default:
          setErrorMessage(res.message);
      }
      setLoading(false);
      return;
    }

    localStorage.setItem("token", res.token);
    if (updateToken && updateUser) {
      updateToken(res.token);
      updateUser(res.user);
    }
    redirect(continueTo ? continueTo : "/");
  };

  const validate = () => {
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
      <div className="h-screen overflow-hidden flex items-center justify-center gap-3 dark:text-white">
        <div className="flex gap-5 p-10 rounded-lg flex-col bg-neutral-100 dark:bg-neutral-800">
          <h1 className="text-6xl text-center">{t("title")}</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-96">
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
                  autoFocus
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
            <div className="flex justify-end gap-3  mt-3">
              <button
                disabled={!validate() || loading}
                className="btn btn-accent text-xl text-white rounded-full w-full"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  t("loginBtn")
                )}
              </button>
            </div>
          </form>
          <div className="divider m-0"></div>
          <div className="flex items-center justify-center gap-2">
            {t("createAcc")}
            <Link
              href={continueTo ? `create?continueTo=${continueTo}` : "create"}
              className="dark:text-white underline"
            >
              {t("createAccLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
