import { useSidebar } from "@/context/sidebarContext";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItem = ({ href, text, Icon }: SidebarItemProps) => {
  const pathname = usePathname();
  const { isMin } = useSidebar();

  const baseIconContainerStyle = clsx(
    "group py-3 rounded-lg hover:dark:bg-base-100 hover:bg-gray-500 hover:text-white flex items-center",
    { "flex-col": isMin },
    { "pr-14": !isMin }
  );
  const baseIconStyle = clsx(
    "group-hover:text-white mx-4 h-[30px] w-[30px] text-gray-500"
  );
  const baseIconTextStyle = clsx(
    "group-hover:text-white text-lg text-gray-500",
    {
      "text-xs font-bold": isMin,
    }
  );

  return (
    <Link href={href}>
      <div
        className={clsx(baseIconContainerStyle, {
          "bg-gray-500 dark:bg-base-100": pathname === href,
        })}
      >
        <Icon
          className={clsx(baseIconStyle, {
            "text-white": pathname === href,
          })}
        />
        <span
          className={clsx(baseIconTextStyle, {
            "text-white": pathname === href,
          })}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};
