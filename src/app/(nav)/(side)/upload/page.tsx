"use client";
import { Alert } from "@/components/Alert";
import { useUser } from "@/context/userContext";
import { createVideo } from "@/services/videoService";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("UploadPage");
  const tCommon = useTranslations("Common");
  const { user, token } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoKey, setVideoKey] = useState<number>(0);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const TITLE_LENGTH = 100;
  const DESCRIPTION_LENGTH = 5000;
  const MAX_FILE_SIZE = 100 * 1024 * 1024;

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (videoFile == null) {
      setIsAlertVisible(true);
      setErrorMessage(t("errorFileEmpty"));
      return;
    }

    if (!title) {
      setIsAlertVisible(true);
      setErrorMessage(tCommon("errorTitleEmpty"));
      setLoading(false);
      return;
    }

    if (token && user) {
      const res = await createVideo(
        user.id,
        title,
        description,
        visibility,
        videoFile,
        token
      );
      if (res.errorCode == "VS000") {
        redirect("/myvideos");
      } else {
        setIsAlertVisible(true);
        setErrorMessage(res.message);
        setLoading(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setIsAlertVisible(true);
      setErrorMessage(t("errorFileEmpty"));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setIsAlertVisible(true);
      setErrorMessage(t("errorFileSize"));
      return;
    }

    if (!file.type.startsWith("video/")) {
      setIsAlertVisible(true);
      setErrorMessage(t("errorInvalidFile"));
      return;
    }

    const videoObjectUrl = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(videoObjectUrl);
    setVideoKey((prevKey) => prevKey + 1);
  };

  const validate = (title: string, description: string) => {
    if (title.length == 0) {
      return false;
    }
    if (title.length > TITLE_LENGTH) {
      return false;
    }
    if (description.length > DESCRIPTION_LENGTH) {
      return false;
    }
    if (videoFile == null) {
      return false;
    }
    return true;
  };

  const labelBaseStyle = clsx("label-text-alt dark:text-white");

  return (
    <div className="p-5">
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md">
        <h1 className="text-center text-4xl font-bold dark:text-white p-5">
          {t("title")}
        </h1>
        <div className="border-t-2 border-neutral-400"></div>
        <Alert
          show={isAlertVisible}
          type="error"
          message={errorMessage}
          onClose={() => setIsAlertVisible(false)}
        />
        <form onSubmit={handleUpload}>
          <div className="grid lg:grid-cols-2 p-5 justify-center">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span
                    className={clsx(labelBaseStyle, {
                      "text-error": title.length > TITLE_LENGTH,
                    })}
                  >
                    {tCommon("titleLabel")}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder={tCommon("titlePlaceholder")}
                  className={clsx("input input-bordered w-96 dark:text-white", {
                    "border-error focus:border-error":
                      title.length > TITLE_LENGTH,
                  })}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                  }}
                  disabled={loading}
                />
                <div className="label w-96">
                  <span className="label-text-alt"></span>
                  <span
                    className={clsx(labelBaseStyle, {
                      "text-error": title.length > TITLE_LENGTH,
                    })}
                  >
                    {title.length}/{TITLE_LENGTH}
                  </span>
                </div>
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span
                    className={clsx(labelBaseStyle, {
                      "text-error": description.length > DESCRIPTION_LENGTH,
                    })}
                  >
                    {tCommon("descriptionLabel")}
                  </span>
                </div>
                <textarea
                  className={clsx(
                    "textarea textarea-bordered h-40 w-96 resize-none dark:text-white",
                    {
                      "border-error focus:border-error":
                        description.length > DESCRIPTION_LENGTH,
                    }
                  )}
                  placeholder={tCommon("descriptionPlaceholder")}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.currentTarget.value);
                  }}
                  disabled={loading}
                ></textarea>
                <div className="label w-96">
                  <span className="label-text-alt"></span>
                  <span
                    className={clsx(labelBaseStyle, {
                      "text-error": description.length > DESCRIPTION_LENGTH,
                    })}
                  >
                    {description.length}/5000
                  </span>
                </div>
              </label>
              <label className="form-control w-96">
                <div className="label">
                  <span className={labelBaseStyle}>
                    {tCommon("visibilityLabel")}
                  </span>
                </div>
                <select
                  className="select select-bordered dark:text-white"
                  value={visibility}
                  onChange={(e) => setVisibility(e.currentTarget.value)}
                  disabled={loading}
                >
                  <option value={"PUBLIC"}>{tCommon("public")}</option>
                  <option value={"PRIVATE"}>{tCommon("private")}</option>
                </select>
              </label>
            </div>

            <div className="flex flex-col gap-5">
              <label className="form-control w-96">
                <div className="label">
                  <span className={labelBaseStyle}>{t("videoFileLabel")}</span>
                </div>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <input
                    type="file"
                    id="fileInput"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-gray-700 text-white py-2 px-4 rounded-l-md cursor-pointer hover:bg-gray-600"
                  >
                    {tCommon("chooseFile")}
                  </label>
                  <span
                    className={clsx("mx-3 text-gray-600", {
                      "truncate w-48": videoFile,
                    })}
                  >
                    {videoFile ? videoFile.name : tCommon("noFileChosen")}
                  </span>
                </div>
              </label>
              {videoUrl && (
                <div className="w-80">
                  <div className="label">
                    <span className={labelBaseStyle}>
                      {tCommon("previewLabel")}
                    </span>
                  </div>
                  <div className="w-80 mx-auto border bg-black rounded-xl ">
                    <video
                      key={videoKey}
                      controls
                      className="rounded-xl object-contain aspect-video"
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-t-2 border-neutral-400"></div>
          <div className="flex justify-end p-5">
            <button
              className="w-24 btn btn-neutral dark:bg-white dark:text-black  rounded-full"
              disabled={!validate(title, description) || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                t("uploadBtn")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
