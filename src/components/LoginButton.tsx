import Link from "next/link";

export const LoginButton = () => {
  return (
    <div>
      <Link
        href={"/login"}
        className="btn btn-accent text-xl text-white rounded-full"
      >
        Login
      </Link>
    </div>
  );
};
