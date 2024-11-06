interface TooltipProps {
  children: React.ReactNode;
  label: string;
}

export default function Tooltip({ children, label }: TooltipProps) {
  return (
    <div
      className="hover:tooltip hover:tooltip-open hover:tooltip-bottom"
      data-tip={label}
    >
      {children}
    </div>
  );
}
