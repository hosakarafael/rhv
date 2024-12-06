import Link from "next/link";

interface LoginButtonProps {
  continueTo?: string;
}

export const LoginButton = ({ continueTo }: LoginButtonProps) => {
  return (
    <div>
      <Link
        href={continueTo ? `/login?continueTo=${continueTo}` : "/login"}
        className="btn btn-accent text-xl text-white rounded-full"
      >
        Login
      </Link>
    </div>
  );
};
