import Link from "next/link";
import { useTranslations } from "next-intl";

interface LoginButtonProps {
  continueTo?: string;
}

export const LoginButton = ({ continueTo }: LoginButtonProps) => {
  const tCommon = useTranslations("Common");
  return (
    <div>
      <Link
        href={continueTo ? `/login?continueTo=${continueTo}` : "/login"}
        className="btn btn-accent text-xl text-white rounded-full"
      >
        {tCommon("login")}
      </Link>
    </div>
  );
};
