import Link from "next/link";
import Avatar from "./Avatar";

export default function LoginBadge() {
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
}
