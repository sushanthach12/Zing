"use client";

import clsx from "clsx";
import { FC } from "react"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: FC<InputProps> = ({ id, label, type, required, disabled, errors, register }) => {

    return <div>
        <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-900 leading-6"
        >
            {label}
        </label>
        <div className="mt-2">
            <input
                id={id}
                type={type}
                autoComplete={id}
                disabled={disabled}
                {...register(id, { required })}
                className={clsx("form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6", 
                    errors[id] && "focus:ring-rose-500",
                    disabled && "opacity-50 cursor-default"
                )}
            />
        </div>
    </div>
}

export default Input;