import type { ButtonHTMLAttributes } from "react"

type FilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string
}

export default function FilterButton({ name, className, ...props }: FilterButtonProps) {
    return (
        <button {...props} className={`bg-primary px-4 py-1 text-background ${className ?? ""}`}>
            {name}
        </button>
    )
}