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

export default function AddProductForm() {
    const [ data, setData ] = useState<IProducts>( {
        image: "",
        title: "",
        description: "",
        price: 0,
        category: "",
        gender: "",
        ageGroup: "",
    } );
    const [ errors, setErrors ] = useState<{
        title?: string;
        price?: string;
        category?: string;
        gender?: string;
        ageGroup?: string;
    }>( {} );

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;

        // Handle price as a number
        if ( name === "price" ) {
            setData( ( prev ) => ( { ...prev, [ name ]: parseFloat( value ) } ) );
        } else {
            setData( ( prev ) => ( { ...prev, [ name ]: value } ) );
        }
    };

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        if ( !data.title || !data.price || !data.category || !data.gender || !data.ageGroup ) {
            setErrors( {
                title: "Title is required",
                price: "Price is required",
                category: "Category is required",
                gender: "Gender is required",
                ageGroup: "Age group is required",
            } );
            return;
        }

        // Validation using Zod
        const validation = addSchema.safeParse( data );
        if ( !validation.success ) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setErrors( {
                title: fieldErrors.title?.[ 0 ],
                price: fieldErrors.price?.[ 0 ],
                category: fieldErrors.category?.[ 0 ],
                gender: fieldErrors.gender?.[ 0 ],
                ageGroup: fieldErrors.ageGroup?.[ 0 ],
            } );
            return;
        }

        setErrors( {} );

        await createProduct( data );
    };

    return (
        <div className="mx-3">
            <Dialog>
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
                                        onValueChange={ ( value ) => {
                                            setData( ( prev ) => ( { ...prev, gender: value } ) );
                                        } }
                                        name="gender"
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
                                        onValueChange={ ( value ) => {
                                            setData( ( prev ) => ( { ...prev, ageGroup: value } ) );
                                        } }
                                        name="ageGroup"
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
