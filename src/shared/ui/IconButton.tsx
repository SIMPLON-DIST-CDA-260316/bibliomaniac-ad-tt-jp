import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
};

export default function IconButton({
  icon: Icon,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`bg-primary/80 text-background p-2.5 rounded-full cursor-pointer hover:bg-primary/50 transition-colors duration-300 ease-out ${className ?? ""}`}
      {...props}
    >
      <Icon size={29} />
    </button>
  );
}
