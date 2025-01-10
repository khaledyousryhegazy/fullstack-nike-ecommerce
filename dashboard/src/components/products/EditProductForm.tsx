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
import { PencilOff } from "lucide-react";
import { IProducts } from "@/interfaces/interfaces";
import React, { useState } from "react";
import { editProduct } from "@/services/products";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchProducts } from "@/rtk/features/productThunk";
import { addSchema } from "../validationSchema";

export default function EditProductForm( { product }: { product: IProducts } ) {
    const dispatch = useAppDispatch();
    const [ open, setOpen ] = useState<boolean>( false );
    const [ data, setData ] = useState<IProducts>( {
        image: product?.image || "",
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || 0,
        category: product?.category || "",
        gender: product?.gender || "",
        ageGroup: product?.ageGroup || "",
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

    const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        if ( !validate() ) return;

        try {
            await editProduct( product!._id, data );
            dispatch( fetchProducts( 1 ) );
            setOpen( false )
        } catch ( error ) {
            console.error( "Failed to update product:", error );
        }
    };

    return (
        <div className="mx-3">
            <Dialog open={ open } onOpenChange={ setOpen }>
                <DialogTrigger asChild>
                    <PencilOff size={ 20 } className="cursor-pointer hover:text-blue-600" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <form onSubmit={ onSubmit }>
                        <div className="grid gap-4 py-4">
                            {/* Title */ }
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title">Title</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Enter product title"
                                        onChange={ handleChange }
                                        defaultValue={ product?.title }
                                    />
                                    { errors.title && (
                                        <small className="text-sm text-red-500">{ errors.title }</small>
                                    ) }
                                </div>
                            </div>

                            {/* Description */ }
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description">Description</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Enter product description"
                                        onChange={ handleChange }
                                        defaultValue={ product?.description }
                                    />
                                </div>
                            </div>

                            {/* Price */ }
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price">Price</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Enter product price"
                                        onChange={ handleChange }
                                        defaultValue={ product?.price }
                                    />
                                    { errors.price && (
                                        <small className="text-sm text-red-500">{ errors.price }</small>
                                    ) }
                                </div>
                            </div>

                            {/* Category */ }
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category">Category</Label>
                                <div className="col-span-3">
                                    <Input
                                        id="category"
                                        name="category"
                                        placeholder="Enter product category"
                                        onChange={ handleChange }
                                        defaultValue={ product?.category }
                                    />
                                    { errors.category && (
                                        <small className="text-sm text-red-500">{ errors.category }</small>
                                    ) }
                                </div>
                            </div>

                            {/* Gender */ }
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="gender">Gender</Label>
                                <div className="col-span-3">
                                    <Select
                                        onValueChange={ ( value ) => handleSelectChange( "gender", value ) }
                                        name="gender"
                                        defaultValue={ product?.gender }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent id="gender">
                                            <SelectGroup>
                                                <SelectItem value="men's">Men's</SelectItem>
                                                <SelectItem value="women's">Women's</SelectItem>
                                                <SelectItem value="boys">Boys</SelectItem>
                                                <SelectItem value="girls">Girls</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    { errors.gender && (
                                        <small className="text-sm text-red-500">{ errors.gender }</small>
                                    ) }
                                </div>
                            </div>

                            {/* Age Group */ }
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="ageGroup">Age Group</Label>
                                <div className="col-span-3">
                                    <Select
                                        onValueChange={ ( value ) => handleSelectChange( "ageGroup", value ) }
                                        name="ageGroup"
                                        defaultValue={ product?.ageGroup }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select age group" />
                                        </SelectTrigger>
                                        <SelectContent id="ageGroup">
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
                            <Button type="submit">Edit Product</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
