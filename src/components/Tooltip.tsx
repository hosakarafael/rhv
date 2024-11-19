import clsx from "clsx";

interface TooltipProps {
  children: React.ReactNode;
  label: string;
  direction?: "bottom" | "left" | "right" | "top";
}

export default function Tooltip({
  children,
  label,
  direction = "bottom",
}: TooltipProps) {
  const style = clsx({
    "hover:tooltip hover:tooltip-open": true,
    "hover:tooltip-bottom": direction == "bottom",
    "hover:tooltip-left": direction == "left",
    "hover:tooltip-right": direction == "right",
    "hover:tooltip-top": direction == "top",
  });

  return (
    <div className={style} data-tip={label}>
      {children}
    </div>
  );
}
