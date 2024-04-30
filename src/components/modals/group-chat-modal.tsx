"use client"

import { FC, memo, useState } from "react"
import { useRouter } from "next/navigation";

import { User } from "@prisma/client"
import Modal from "../ui/modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios, { Axios, AxiosError } from "axios";
import toast from "react-hot-toast";
import Input from "../ui/input";
import Select from "../ui/select";
import Button from "../ui/button";

interface GroupChatModalProps {
    isOpen: boolean
    onClose: () => void
    users: User[]
}

const GroupChatModal: FC<GroupChatModalProps> = ({ isOpen, onClose, users }) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: []
        }
    });

    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true);
            await axios.post("/api/conversations", {
                ...data,
                isGroup: true
            });

            onClose();
            router.refresh();

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            } else {
                toast.error("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Create a new group
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-gray-600">Create a chat with more than 2 people.</p>

                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                required
                                register={register}
                                errors={errors}
                            />


                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    label: user.name,
                                    value: user.id
                                }))}
                                onChange={(value) => setValue("members", value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>

                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        type="button"
                        onClick={onClose}
                        secondary
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal;