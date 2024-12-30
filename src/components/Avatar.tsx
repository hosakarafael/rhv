import clsx from "clsx";

interface AvatarProps {
  size: "XS" | "S" | "M" | "L";
  userId: number;
  username: string;
  profileImageUrl: string;
}

const Avatar = ({ size, userId, username, profileImageUrl }: AvatarProps) => {
  const colorMap = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
  ];

  function generateBackgroundColor(number: number) {
    return colorMap[number % colorMap.length];
  }

  const backgroundColor = generateBackgroundColor(userId);

  return (
    <div>
      <div
        className={clsx({
          "rounded-full flex justify-center items-center ": true,
          [backgroundColor]: backgroundColor,
          "w-[30px] h-[30px]": size == "XS",
          "w-[40px] h-[40px]": size == "S",
          "w-[50px] h-[50px]": size == "M",
          "w-[120px] h-[120px]": size == "L",
        })}
      >
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            className="rounded-full"
            alt="profile image"
          />
        ) : (
          <span
            className={clsx("font-extrabold text-white", {
              "text-lg": size == "XS",
              "text-xl": size == "S",
              "text-2xl": size == "M",
              "text-7xl": size == "L",
            })}
          >
            {username.charAt(0)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
