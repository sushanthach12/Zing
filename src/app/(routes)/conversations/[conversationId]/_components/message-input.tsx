"use client"

import { FC } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string;
    type?: string;
    required: boolean;
    placeholder?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const MessageInput: FC<MessageInputProps> = ({ type, id, placeholder, errors, required, register }) => {

    return (
        <div className="relative w-full">
            <input
                type={type}
                id={id}
                autoComplete="off"
                {...register(id, { required })}
                placeholder={placeholder}
                className="text-black font-medium py-2 px-4 bg-neutral-100 w-full rounded-md focus:outline-none"
            />

        </div>
    )
}

export default MessageInput;