"use client";
import Avatar from "@/components/Avatar";
import { useUser } from "@/context/userContext";
import { UserType } from "@/lib/definitions";
import { uploadProfileImage } from "@/services/userService";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

interface ProfileImageProps {
  user: UserType;
}

export const ProfileImage = ({ user }: ProfileImageProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { token } = useUser();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      if (token) {
        uploadProfileImage(file, token);
      }
    } else {
      //error
    }
  };

  return (
    <div className="relative group">
      <div className="w-full h-auto transition-opacity duration-300 group-hover:opacity-50">
        <Avatar
          size="L"
          userId={user.id}
          username={user.name}
          profileImageUrl={user.profileImageUrl}
        />
      </div>
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
    </div>
  );
};
