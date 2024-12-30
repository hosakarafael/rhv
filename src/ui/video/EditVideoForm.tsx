"use client";
import { Alert } from "@/components/Alert";
import { useUser } from "@/context/userContext";
import { VideoType } from "@/lib/definitions";
import { editVideo, fetchVideoById } from "@/services/videoService";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface EditVideoFormProps {
  id: string;
}

export const EditVideoForm = ({ id }: EditVideoFormProps) => {
  const { token, user } = useUser();

  const [video, setVideo] = useState<VideoType | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<string>("PUBLIC");

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const TITLE_LENGTH = 100;
  const DESCRIPTION_LENGTH = 5000;

  async function init() {
    if (token && user) {
      const res = await fetchVideoById(id, token);
      if (res.user.id != user.id) {
        redirect("/");
      }
      setVideo(res);
      setTitle(res.title);
      setDescription(res.description);
      setVisibility(res.visibility);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const handleEdit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (token) {
      const res = await editVideo(
        Number(id),
        title,
        description,
        visibility,
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

  const validate = () => {
    if (title.length == 0) {
      return false;
    }
    if (title.length > TITLE_LENGTH) {
      return false;
    }
    if (description.length > DESCRIPTION_LENGTH) {
      return false;
    }
    return true;
  };

  const labelBaseStyle = clsx("label-text-alt dark:text-white");

  return (
    video && (
      <div className="p-5">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md">
          <h1 className="text-center text-4xl font-bold dark:text-white p-5">
            Edit video
          </h1>
          <div className="border-t-2 border-neutral-400"></div>
          <Alert
            show={isAlertVisible}
            type="error"
            message={errorMessage}
            onClose={() => setIsAlertVisible(false)}
          />
          <form onSubmit={handleEdit}>
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
                    className={clsx("input input-bordered w-96", {
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
                      "textarea textarea-bordered h-40 resize-none",
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
                    className="select select-bordered"
                    value={visibility}
                    onChange={(e) => setVisibility(e.currentTarget.value)}
                  >
                    <option value={"PUBLIC"}>Public</option>
                    <option value={"PRIVATE"}>Private</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <div className="label">
                    <span className={labelBaseStyle}>Preview</span>
                  </div>
                  <div className="w-80 mx-auto border bg-black rounded-xl ">
                    <video
                      controls
                      className="rounded-xl object-contain aspect-video"
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-neutral-400"></div>
            <div className="flex justify-end p-5">
              <button
                className="w-24 btn btn-neutral dark:bg-white dark:text-black rounded-full"
                disabled={!validate() || loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};