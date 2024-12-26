'use client'
import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";

interface LoginData {
    email: string;
    password: string;
}

const loginSchema = z.object( {
    email: z.string().email( "Invalid email address" ),
    password: z.string().min( 4, "Password must be at least 4 characters long" ),
} );

export default function Page() {
    const [ passwordShown, setPasswordShown ] = useState( false );
    const togglePasswordVisibility = () => setPasswordShown( ( cur ) => !cur );

    // State to store input data
    const [ data, setData ] = useState<LoginData>( { email: "", password: "" } );
    const [ errors, setErrors ] = useState<{ email?: string; password?: string }>( {} );

    const auth = useAuth();

    // Handle input change
    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) );
    };

    const handleSubmitEvent = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const validation = loginSchema.safeParse( data );
        if ( !validation.success ) {
            const fieldErrors = validation.error.formErrors.fieldErrors;
            setErrors( {
                email: fieldErrors.email?.[ 0 ],
                password: fieldErrors.password?.[ 0 ],
            } );
            return;
        }
        setErrors( {} )
        auth.loginAction( data );
    };

    return (
        <section className="grid text-center items-center p-6">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    Login
                </Typography>
                <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                    Enter your email and password to
                </Typography>
                <form onSubmit={ handleSubmitEvent } className="mx-auto max-w-[24rem] text-left">
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
                            value={ data.email }
                            onChange={ handleInputChange }
                            className="w-full placeholder:opacity-100 focus:border-gray-400 focus:border-[.5px] focus:border-t-gray-400"
                            labelProps={ {
                                className: "hidden",
                            } }
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
                            labelProps={ {
                                className: "hidden",
                            } }
                            className="w-full placeholder:opacity-100 focus:border-gray-400 focus:border-[.5px] focus:border-t-gray-400"
                            type={ passwordShown ? "text" : "password" }
                            name="password"
                            value={ data.password }
                            onChange={ handleInputChange }
                            icon={
                                <i onClick={ togglePasswordVisibility }>
                                    { passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) }
                                </i>
                            }
                        />
                        { errors.password && (
                            <Typography color="red" variant="small" className="mt-1">
                                { errors.password }
                            </Typography>
                        ) }
                    </div>
                    <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
                        Login
                    </Button>

                    <Typography
                        variant="small"
                        color="gray"
                        className="!mt-4 text-center font-normal"
                    >
                        Not registered?{ " " }
                        <Link href="/sign-up" className="font-medium text-gray-900">
                            Create account
                        </Link>
                    </Typography>
                </form>
            </div>
        </section>
    );
}
