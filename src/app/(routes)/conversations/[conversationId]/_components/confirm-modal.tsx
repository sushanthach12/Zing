"use client";

import { FC, useCallback, useState } from "react"
import Modal from "../../../../../components/ui/modal";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/use-conversation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";
import Button from "../../../../../components/ui/button";
import { Dialog } from "@headlessui/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {

    const router = useRouter();

    const { conversationId } = useConversation();

    const [isLoading, setIsLoading] = useState(false)

    const onDelete = useCallback(async () => {
        setIsLoading(true);

        try {
            await axios.delete(`/api/conversations/${conversationId}`);

            onClose();
            router.push("/conversations");
            router.refresh();

        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [conversationId, router, onClose]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className=" mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle
                        className="h-6 w-6 text-red-600"
                    />
                </div>
                <div
                    className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left " >
                    <Dialog.Title
                        as="h3"
                        className=" text-base font-semibold leading-6 text-gray-900">
                        Delete conversation
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete this conversation? This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className=" mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>

    )
}

export default ConfirmModal;