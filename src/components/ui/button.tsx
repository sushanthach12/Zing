"use client";

import React, { FC } from "react"
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps {
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, type, onClick, fullWidth, danger, secondary, disabled }) => {

    return <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={clsx("flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            disabled && "opacity-50 cursor-default",
            fullWidth && "w-full",
            secondary ? "text-gray-900" : "text-white",
            danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
            !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
        )}
    >
        {disabled && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        {children}
    </button>
}

export default Button;