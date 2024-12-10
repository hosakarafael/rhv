import clsx from "clsx";

interface AvatarProps {
  size: "S" | "M" | "L";
}

const Avatar = ({ size }: AvatarProps) => {
  return (
    <div className="avatar">
      <div
        className={clsx({
          "rounded-full": true,
          "w-[40px] h-[40px]": size == "S",
          "w-[50px] h-[50px]": size == "M",
          "w-[120px] h-[120px]": size == "L",
        })}
      >
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
  );
};

export default Avatar;
