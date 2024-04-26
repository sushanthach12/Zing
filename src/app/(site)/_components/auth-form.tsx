"use client";

import { FC, useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import AuthSocialButton from "./auth-social-button";

interface AuthFormProps { }

type Variant = "LOGIN" | "REGISTER";

const AuthForm: FC<AuthFormProps> = ({ }) => {

    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        if (variant === "LOGIN") {
            // NextAuth Sign
        } else {
            // Axios Register
        }

        setIsLoading(false);
    }


    const socialActions = (action: string) => {
        setIsLoading(true);

        // NextAuth Signin Social

        setIsLoading(false);
    }

    return <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow-sm rounded-lg sm:px-10">
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="Name"
                            type="text"
                            register={register}
                            errors={errors}
                        />
                    )
                }

                <Input
                    id="email"
                    label="Email address"
                    type="email"
                    register={register}
                    errors={errors}
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    register={register}
                    errors={errors}
                />

                <div>
                    <Button
                        disabled={isLoading}
                        fullWidth
                        type="submit"
                    >
                        {variant === "LOGIN" ? "Sign in" : "Register"}
                    </Button>
                </div>
            </form>

            <div className="mt-6 ">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>

                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <AuthSocialButton icon={BsGithub} onClick={() => socialActions("github")}/>
                    <AuthSocialButton icon={BsGoogle} onClick={() => socialActions("google")}/>
                </div>
            </div>

            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                <div>
                    {variant === "LOGIN" ? "Don't have an account?" : "Already have an account?"}
                </div>

                <div
                    onClick={toggleVariant}
                    className="underline cursor-pointer "
                >
                    {variant === "LOGIN" ? "Create an account" : "Sign in"}
                </div>
            </div>
        </div>
    </div>
}

export default AuthForm;