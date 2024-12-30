"use client";
import { Alert } from "@/components/Alert";
import { useUser } from "@/context/userContext";
import { createVideo } from "@/services/videoService";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
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
      setErrorMessage("Upload a video file");
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

    if (file && file.type.startsWith("video/")) {
      const videoObjectUrl = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoUrl(videoObjectUrl);
      setVideoKey((prevKey) => prevKey + 1);
    } else {
      setIsAlertVisible(true);
      setErrorMessage("Please upload a valid video file.");
    }
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
          Upload video
        </h1>
        <div className="border-t-2 border-neutral-400"></div>
        <Alert
          show={isAlertVisible}
          type="error"
          message={errorMessage}
          onClose={() => setIsAlertVisible(false)}
        />
        <form onSubmit={handleUpload}>
          <div className="flex justify-around p-5">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span
                    className={clsx(labelBaseStyle, {
                      "text-error": title.length > TITLE_LENGTH,
                    })}
                  >
                    Title (required)
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Add title that describes your video"
                  className={clsx("input input-bordered w-96 dark:text-white", {
                    "border-error focus:border-error":
                      title.length > TITLE_LENGTH,
                  })}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                  }}
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

              <label className="form-control">
                <div className="label">
                  <span
                    className={clsx(labelBaseStyle, {
                      "text-error": description.length > DESCRIPTION_LENGTH,
                    })}
                  >
                    Description
                  </span>
                </div>
                <textarea
                  className={clsx(
                    "textarea textarea-bordered h-40 resize-none dark:text-white",
                    {
                      "border-error focus:border-error":
                        description.length > DESCRIPTION_LENGTH,
                    }
                  )}
                  placeholder="Tell viewers about your video"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.currentTarget.value);
                  }}
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
                  <span className={labelBaseStyle}>Visibility</span>
                </div>
                <select
                  className="select select-bordered dark:text-white"
                  value={visibility}
                  onChange={(e) => setVisibility(e.currentTarget.value)}
                >
                  <option value={"PUBLIC"}>Public</option>
                  <option value={"PRIVATE"}>Private</option>
                </select>
              </label>
            </div>

            <div className="flex flex-col gap-5">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className={labelBaseStyle}>Video file (required)</span>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  className="file-input file-input-bordered w-full max-w-xs dark:text-white"
                  onChange={handleFileChange}
                />
              </label>
              {videoUrl && (
                <div>
                  <div className="label">
                    <span className={labelBaseStyle}>Preview</span>
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
                "Upload"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
