import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export default function Button({ children, className, fullWidth, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-primary text-background font-semibold p-2.5 rounded-md border-2 border-primary cursor-pointer hover:bg-background hover:text-primary transition-colors duration-300 ease-out ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
