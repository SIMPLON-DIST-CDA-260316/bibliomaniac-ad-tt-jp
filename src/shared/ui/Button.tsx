import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  ghost?: boolean;
};

export default function Button({ children, className, fullWidth, ghost, ...props }: ButtonProps) {
  const colors = ghost
    ? "bg-background text-primary hover:bg-primary hover:text-background"
    : "bg-primary text-background hover:bg-background hover:text-primary";
  return (
    <button
      className={`${colors} font-semibold p-2.5 rounded-md border-2 border-primary cursor-pointer transition-colors duration-300 ease-out ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
