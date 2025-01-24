import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import React, { useState } from "react";
import { addSchema } from "../validationSchema";
import { createProduct } from "@/services/products";
import { IProducts } from "@/interfaces/interfaces";
import { fetchProducts } from "@/rtk/features/products/productThunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useToast } from "@/hooks/use-toast";

export default function AddProductForm() {
    const dispatch = useAppDispatch();
    const { toast } = useToast()
    const [ open, setOpen ] = useState<boolean>( false );
    const [ data, setData ] = useState<IProducts>( {
        image: "",
        title: "",
        description: "",
        price: 0,
        category: "",
        gender: "",
        ageGroup: "",
    } );
    const [ errors, setErrors ] = useState<Partial<Record<keyof IProducts, string>>>( {} );

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setData( ( prev ) => ( {
            ...prev,
            [ name ]: name === "price" ? parseFloat( value ) || 0 : value,
        } ) );
    };
    const handleSelectChange = ( name: string, value: string ) => {
        setData( ( prev ) => ( { ...prev, [ name ]: value } ) );
    };

    const validate = (): boolean => {
        const validationResult = addSchema.safeParse( data );
        if ( !validationResult.success ) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            setErrors( {
                title: fieldErrors.title?.[ 0 ],
                price: fieldErrors.price?.[ 0 ],
                category: fieldErrors.category?.[ 0 ],
                gender: fieldErrors.gender?.[ 0 ],
                ageGroup: fieldErrors.ageGroup?.[ 0 ],
            } );
            return false;
        }
        setErrors( {} );
        return true;
    };

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        if ( !validate() ) return;

        try {
            await createProduct( data );
            dispatch( fetchProducts( 1 ) );
            setOpen( false )

            toast( {
                description: "Product Created Successfully",
            } )

        } catch ( error ) {
            console.error( "Failed to update product:", error );
        }

    };

    return (
        <div className="mx-3">
            <Dialog open={ open } onOpenChange={ setOpen }>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Plus /> Add New Product
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <form onSubmit={ handleSubmit }>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title">Title</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Enter product title"
                                        onChange={ handleChange }
                                    />
                                    { errors.title && (
                                        <small className="text-sm text-red-500">{ errors.title }</small>
                                    ) }
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description">Description</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Enter product description"
                                        onChange={ handleChange }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price">Price</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Enter product price"
                                        onChange={ handleChange }
                                    />
                                    { errors.price && (
                                        <small className="text-sm text-red-500">{ errors.price }</small>
                                    ) }
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category">Category</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="category"
                                        name="category"
                                        placeholder="Enter product category"
                                        onChange={ handleChange }
                                    />
                                    { errors.category && (
                                        <small className="text-sm text-red-500">{ errors.category }</small>
                                    ) }
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="gender">Gender</Label>
                                <div className="col-span-3">
                                    <Select
                                        value={ data.gender }
                                        name="gender"
                                        onValueChange={ ( value ) => {
                                            handleSelectChange( "gender", value )
                                        } }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="men's">Men's</SelectItem>
                                                <SelectItem value="women's">Women's</SelectItem>
                                                <SelectItem value="girls">Girls</SelectItem>
                                                <SelectItem value="boys">Boys</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    { errors.gender && (
                                        <small className="text-sm text-red-500">{ errors.gender }</small>
                                    ) }
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="ageGroup">Age Group</Label>
                                <div className="col-span-3">
                                    <Select
                                        value={ data.ageGroup }
                                        name="ageGroup"
                                        onValueChange={ ( value ) => {
                                            handleSelectChange( "ageGroup", value )
                                        } }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select age group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="adults">Adults</SelectItem>
                                                <SelectItem value="children">Children</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    { errors.ageGroup && (
                                        <small className="text-sm text-red-500">{ errors.ageGroup }</small>
                                    ) }
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add Product</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
