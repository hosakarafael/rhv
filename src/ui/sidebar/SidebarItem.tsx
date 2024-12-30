import { useSidebar } from "@/context/sidebarContext";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ActiveIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItem = ({
  href,
  text,
  Icon,
  ActiveIcon,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const { isMin } = useSidebar();

  const baseIconContainerStyle = clsx(
    "group py-3 rounded-lg hover:dark:bg-neutral-800 hover:bg-gray-200 flex items-center",
    { "flex-col": isMin },
    { "pr-14": !isMin }
  );
  const baseIconStyle = clsx("mx-4 h-[30px] w-[30px] dark:text-white");
  const baseIconTextStyle = clsx("text-lg light:text-black dark:text-white", {
    "text-xs": isMin,
  });

  return (
    <Link href={href}>
      <div
        className={clsx(baseIconContainerStyle, {
          "bg-gray-200 dark:bg-neutral-800": pathname === href,
        })}
      >
        {pathname === href ? (
          <ActiveIcon className={clsx(baseIconStyle)} />
        ) : (
          <Icon className={clsx(baseIconStyle)} />
        )}
        <span
          className={clsx(baseIconTextStyle, {
            "font-extrabold": pathname === href,
          })}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};
