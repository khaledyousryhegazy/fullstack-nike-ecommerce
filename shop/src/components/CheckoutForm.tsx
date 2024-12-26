'use client'
import { IOrder } from "@/interfaces/interfaces";
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { z } from "zod";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cartStore";

const checkoutSchema = z.object( {
    shippingAddress: z.string().min( 3, "Please Provide Valid Address" ),
} );

export function CheckoutForm() {
    const [ data, setData ] = useState<IOrder>( { shippingAddress: "", paymentMethod: "" } )
    const [ errors, setErrors ] = useState<{ shippingAddress?: string }>( {} )

    const createOrder = useCart( state => state.createOrder )

    const router = useRouter()

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setData( prevData => ( {
            ...prevData,
            [ name ]: value
        } ) )
    }

    const handleSelectChange = ( value: string | undefined ) => {
        setData( ( prevData ) => ( {
            ...prevData,
            paymentMethod: value || "cash",
        } ) );
    };

    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const validation = checkoutSchema.safeParse( data );
        if ( !validation.success ) {
            const fieldErrors = validation.error.formErrors.fieldErrors;
            setErrors( {
                shippingAddress: fieldErrors.shippingAddress?.[ 0 ],
            } );
            return;
        }

        setErrors( {} );
        createOrder( data );

        router.push( '/' )

        Alert( {
            title: "Order Created Successfully",
            icon: "success"
        } )
    }

    return (
        <div className="flex justify-center px-1.5 my-20">
            <Card color="transparent" shadow={ false }>
                <Typography variant="h4" color="blue-gray">
                    Checkout
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    complete the form to checkout
                </Typography>
                <form onSubmit={ handleSubmit } className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Your Address
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="EG, CITY, ST"
                                name="shippingAddress"
                                className=" !border-t-blue-gray-200  focus:!border-t-gray-900"
                                labelProps={ {
                                    className: "before:content-none after:content-none",
                                } }
                                onChange={ handleChange }
                            />
                            { errors.shippingAddress && (
                                <Typography color="red" variant="small" className="mt-1 font-semibold text-xs">
                                    { errors.shippingAddress }
                                </Typography>
                            ) }
                        </div>

                        <Select name="paymentMethod" onChange={ ( value ) => handleSelectChange( value ) } label="Payment Method">
                            <Option value="cash">Cash On Delivery</Option>
                            <Option value="card" disabled>Card</Option>
                        </Select>
                    </div>

                    <Button type="submit" className="mt-6" fullWidth>
                        Complete Order
                    </Button>
                </form>
            </Card>
        </div>

    );
}