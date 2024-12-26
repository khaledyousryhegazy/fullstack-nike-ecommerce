'use client'
import React, { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import Alert from "@/components/Alert";

interface registerData {
    username?: string,
    email: string,
    password: string
}

const registerSchema = z.object( {
    username: z.string().min( 4, 'username must be a 4 characters' ),
    email: z.string().email( "Invalid email address" ),
    password: z.string().min( 4, "Password must be at least 4 characters long" ),
} )

export default function Page() {
    const [ passwordShown, setPasswordShown ] = useState( false );
    const togglePasswordVisiblity = () => setPasswordShown( ( cur ) => !cur );
    const auth = useAuth();
    const [ data, setData ] = useState<registerData>( { username: "", email: "", password: "" } )
    const [ errors, setErrors ] = useState<{ username?: string; email?: string; password?: string }>( {} );


    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        try {
            const { name, value } = e.target
            setData( prevData => ( {
                ...prevData,
                [ name ]: value
            } ) )

        } catch ( error ) {
            const errorMessage = error instanceof Error ? error.message : String( error );

            Alert( {
                title: errorMessage,
                icon: "error"
            } )
        }
    }


    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        const validation = registerSchema.safeParse( data );
        if ( !validation.success ) {
            const fieldErrors = validation.error?.formErrors.fieldErrors;
            setErrors( {
                username: fieldErrors.username?.[ 0 ],
                email: fieldErrors.email?.[ 0 ],
                password: fieldErrors.password?.[ 0 ],
            } )
            return
        }
        setErrors( {} )
        auth.registerAction( data )
    }

    return (
        <section className="grid text-center items-center p-6">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-5">
                    Sign Up
                </Typography>

                <form onSubmit={ handleSubmit } className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="username">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                User Name
                            </Typography>
                        </label>
                        <Input
                            id="username"
                            color="gray"
                            size="lg"
                            type="text"
                            name="username"
                            placeholder="@user name"
                            className="w-full placeholder:opacity-100 focus:border-gray-400 focus:border-[.5px] focus:border-t-gray-400"
                            labelProps={ {
                                className: "hidden",
                            } }
                            onChange={ handleChange }
                        />
                        { errors.username && (
                            <Typography color="red" variant="small" className="mt-1">
                                { errors.username }
                            </Typography>
                        ) }
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Your Email
                            </Typography>
                        </label>
                        <Input
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="name@mail.com"
                            className="w-full placeholder:opacity-100 focus:border-gray-400 focus:border-[.5px] focus:border-t-gray-400"
                            labelProps={ {
                                className: "hidden",
                            } }
                            onChange={ handleChange }
                        />
                        { errors.email && (
                            <Typography color="red" variant="small" className="mt-1">
                                { errors.email }
                            </Typography>
                        ) }
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Password
                            </Typography>
                        </label>
                        <Input
                            size="lg"
                            placeholder="********"
                            name="password"
                            labelProps={ {
                                className: "hidden",
                            } }
                            className="w-full placeholder:opacity-100 focus:border-gray-400 focus:border-[.5px] focus:border-t-gray-400"
                            type={ passwordShown ? "text" : "password" }
                            icon={
                                <i onClick={ togglePasswordVisiblity }>
                                    { passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) }
                                </i>
                            }
                            onChange={ handleChange }
                        />
                        { errors.password && (
                            <Typography color="red" variant="small" className="mt-1">
                                { errors.password }
                            </Typography>
                        ) }
                    </div>
                    <Button color="gray" type="submit" size="lg" className="mt-6" fullWidth>
                        Sign Up
                    </Button>

                    <Typography
                        variant="small"
                        color="gray"
                        className="!mt-4 text-center font-normal"
                    >
                        Have Account?{ " " }
                        <Link href="/login" className="font-medium text-gray-900">
                            Login
                        </Link>
                    </Typography>
                </form>
            </div>
        </section>
    );
}

