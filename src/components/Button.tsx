import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button
            className={`
                px-5 py-2.5
                rounded-lg
                bg-black text-white
                font-medium
                cursor-pointer
                transition-all duration-200
                hover:bg-zinc-800
                hover:-translate-y-0.5
                active:translate-y-0
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:translate-y-0
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}