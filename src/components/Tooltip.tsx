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
  return (
    <div
      className={`hover:tooltip hover:tooltip-open hover:tooltip-${direction}`}
      data-tip={label}
    >
      {children}
    </div>
  );
}
