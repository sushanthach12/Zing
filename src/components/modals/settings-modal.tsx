"use client";

import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../ui/modal";
import Input from "../ui/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../ui/button";

interface SettingsModalProps {
    currentUser: User;
    isOpen?: boolean;
    onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ currentUser, isOpen, onClose }) => {

    const router = useRouter();;

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true);

            await axios.post('/api/settings', data);

            router.refresh();
            onClose();

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
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
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Edit your profile.</p>

                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />

                            <div >
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium text-gray-900 leading-6"
                                >
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        src={image || currentUser?.image || "/images/placeholder.jpg"}
                                        alt="Profile Image"
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />

                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="g2gdb0xc"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Edit Photo
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            type="button"
                            secondary
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>

                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal;