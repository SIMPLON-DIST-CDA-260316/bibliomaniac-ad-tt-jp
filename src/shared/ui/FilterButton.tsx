import type { ButtonHTMLAttributes } from "react"

type FilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string
}

export default function FilterButton({ name, className, ...props }: FilterButtonProps) {
    return (
        <button {...props} className={`bg-primary px-4 py-1.5 rounded-sm text-background cursor-pointer md:hover:bg-primary/80 ${className ?? ""}`}>
            {name}
        </button>
    )
}