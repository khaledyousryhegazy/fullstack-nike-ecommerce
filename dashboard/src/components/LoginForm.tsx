import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { loginToDashboard } from "@/rtk/features/login/loginThunk";
import { useSelector } from "react-redux";
import { selectLoginError, selectLoginLoading, selectLoginSuccess, selectLoginUserInfo, selectLoginUserToken } from "@/rtk/features/login/LoginSelectors";
import { useToast } from "@/hooks/use-toast";
import Cookies from 'js-cookie';

const loginSchema = z.object( {
    email: z.string().email(),
    password: z.string().min( 4, 'password should be more than 4 characters' )
} )

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { toast } = useToast()
    // login selectors
    const success = useSelector( selectLoginSuccess )
    const loading = useSelector( selectLoginLoading )
    const loginError = useSelector( selectLoginError )
    const userInfo = useSelector( selectLoginUserInfo )
    const token = useSelector( selectLoginUserToken )


    const [ data, setData ] = useState( {
        email: "",
        password: "",
    } );

    const [ errors, setErrors ] = useState<{ email?: string, password?: string }>( {} );

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setData( ( prev ) => ( {
            ...prev,
            [ name ]: value,
        } ) );
    };


    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        const validationResult = loginSchema.safeParse( data );

        if ( !validationResult.success ) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            setErrors( {
                email: fieldErrors.email?.[ 0 ],
                password: fieldErrors.password?.[ 0 ],
            } );
            return false;
        }
        setErrors( {} );

        try {
            // axios request
            dispatch( loginToDashboard( data ) );
        } catch ( error ) {
            const loginErr = error instanceof Error ? error.message : String( error );
            toast( {
                variant: "destructive",
                title: "Error",
                description: loginErr,
            } );
        }
    };

    useEffect( () => {
        if ( loginError ) {
            toast( {
                variant: "destructive",
                title: "Login Failed",
                description: loginError,
            } );
        }

        // Handle successful login
        if ( !loading && !loginError && success ) {
            toast( {
                title: "Login Successful",
                description: "Login to Dashboard Successfully",
            } );

            // store token and userinfo in cookies
            if ( token && userInfo ) {
                Cookies.set( 'token', token || '', { expires: 7 } );
                Cookies.set( 'userInfo', userInfo ? JSON.stringify( userInfo ) : '', { expires: 7 } );
            }

            navigate( '/' );
        }

    }, [ loginError, success, loading, toast, navigate, token, userInfo ] );

    return (
        <div className="mx-3 max-w-[450px]">
            <form onSubmit={ handleSubmit }>
                <div className="grid gap-4 py-4">
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
                <Button className="w-full" type="submit" disabled={ loading }>Login</Button>
            </form>
        </div>
    );
}
