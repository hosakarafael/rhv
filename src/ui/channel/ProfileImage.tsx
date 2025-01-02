"use client";
import { Alert } from "@/components/Alert";
import Avatar from "@/components/Avatar";
import { useUser } from "@/context/userContext";
import { UserType } from "@/lib/definitions";
import { uploadProfileImage } from "@/services/userService";
import { CameraIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react";

interface ProfileImageProps {
  user: UserType;
  updateUser: (user: UserType) => void;
}

export const ProfileImage = ({ user, updateUser }: ProfileImageProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { user: loggedUser, token } = useUser();
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      if (token) {
        const res = await uploadProfileImage(file, token);
        if (res.errorCode == "US000") {
          updateUser(res);
        } else {
          setIsAlertVisible(true);
          setErrorMessage(res.message);
        }
      }
    } else {
      setIsAlertVisible(true);
      setErrorMessage("Please upload a valid video file.");
    }
    setLoading(false);
  };

  const renderHiddenFileInput = () => {
    return (
      <div
        onClick={() => ref.current?.click()}
        className="w-[120px] h-[120px] flex justify-center rounded-full absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 cursor-pointer"
      >
        <CameraIcon className="w-[30px] text-white" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={ref}
        />
      </div>
    );
  };

  return (
    <div className="relative group">
      <Alert
        show={isAlertVisible}
        type="error"
        message={errorMessage}
        onClose={() => setIsAlertVisible(false)}
      />
      <div
        className={clsx("w-full h-auto", {
          "transition-opacity duration-300 group-hover:opacity-50":
            loggedUser && user.id == loggedUser.id,
        })}
      >
        {loading ? (
          <span className="loading loading-spinner w-[120px] h-[120px] dark:bg-white"></span>
        ) : (
          <Avatar
            size="L"
            userId={user.id}
            username={user.name}
            profileImageUrl={user.profileImageUrl}
          />
        )}
      </div>
      {loggedUser && user.id == loggedUser.id ? renderHiddenFileInput() : <></>}
    </div>
  );
};
