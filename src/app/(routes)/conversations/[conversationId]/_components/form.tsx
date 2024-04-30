"use client";

import useConversation from "@/hooks/use-conversation";
import axios, { AxiosError } from "axios";
import { Image as LucideImage, SendHorizonal } from "lucide-react";
import { FC } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MessageInput from "./message-input";
import { CldUploadButton } from "next-cloudinary";

interface FormProps { }

const Form: FC<FormProps> = ({ }) => {

    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setValue('message', '', { shouldValidate: true });

            await axios.post(`/api/messages`, {
                ...data,
                conversationId
            });

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            }
        }
    }


    const handleUpload = async (result: any) => {
        try {
            await axios.post(`/api/messages`, {
                image: result?.info?.secure_url,
                conversationId
            });

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            }
        }
    }

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">

            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="g2gdb0xc"
            >
                <LucideImage
                    size={30}
                    className="text-sky-500"
                />
            </CldUploadButton>


            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Type a message"
                />

                <button
                    type="submit"
                    className="rounded-md p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
                >
                    <SendHorizonal size={20} className="text-white" />
                </button>
            </form>
        </div>
    )
}

export default Form;