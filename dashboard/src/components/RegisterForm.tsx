// RegisterForm.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { z } from "zod";
import { createUser } from "@/rtk/features/register/registerThunk";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { selectError } from "@/rtk/features/register/registerSelectors"; // Select error from state

const registerSchema = z.object( {
    username: z.string().min( 3, 'username should be more than 3 characters' ),
    email: z.string().email(),
    password: z.string().min( 4, 'password should be more than 4 characters' )
} );

export default function RegisterForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Get error from the Redux state
    const error = useSelector( selectError );

    const [ data, setData ] = useState( {
        username: "",
        email: "",
        password: "",
        role: "admin"
    } );

    const [ errors, setErrors ] = useState<{ username?: string, email?: string, password?: string }>( {} );

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setData( prev => ( {
            ...prev,
            [ name ]: value,
        } ) );
    };

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        const validationResult = registerSchema.safeParse( data );

        if ( !validationResult.success ) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            setErrors( {
                username: fieldErrors.username?.[ 0 ],
                email: fieldErrors.email?.[ 0 ],
                password: fieldErrors.password?.[ 0 ],
            } );
            return false;
        }
        setErrors( {} );

        try {
            await dispatch( createUser( data ) );

            // If there's an error after dispatching, show it in a toast
            if ( error ) {
                toast( {
                    variant: "destructive",
                    title: "Registration Failed",
                    description: error,
                } );
                return;
            }

            // If registration succeeds, show success message and navigate to login page
            toast( {
                title: "Register",
                description: "Account Created Successfully",
            } );

            navigate( '/login' );
        } catch ( error ) {
            console.error( "Failed to create account:", error );
        }
    };

    return (
        <div className="mx-3 max-w-[450px]">
            <form onSubmit={ handleSubmit }>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">User Name</Label>
                        <div className="col-span-3">
                            <Input
                                id="username"
                                name="username"
                                placeholder="Enter username"
                                onChange={ handleChange }
                            />
                            { errors.username && (
                                <small className="text-sm text-red-500">{ errors.username }</small>
                            ) }
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email">Email</Label>
                        <div className="col-span-3">
                            <Input
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={ handleChange }
                            />
                            { errors.email && (
                                <small className="text-sm text-red-500">{ errors.email }</small>
                            ) }
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password">Password</Label>
                        <div className="col-span-3">
                            <Input
                                id="password"
                                name="password"
                                type="text"
                                placeholder="Enter password"
                                onChange={ handleChange }
                            />
                            { errors.password && (
                                <small className="text-sm text-red-500">{ errors.password }</small>
                            ) }
                        </div>
                    </div>

                </div>
                <Link to={ '/login' } className="text-sm my-2 block">Already have an account ?</Link>
                <Button className="w-full" type="submit">Create Account</Button>
            </form>
        </div>
    );
}
