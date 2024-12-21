'use client'

import { useCart } from "@/store/cartStore"
import { useProducts } from "@/store/productStore"
import { Button } from "@material-tailwind/react"
import Image from "next/image"
import { useEffect } from "react"

export default function ProductDetails( { _id }: { _id: string } ) {

    const getSingleProduct = useProducts( state => state.getSingleProduct )
    const addToCart = useCart( ( state ) => state.addProduct );
    const product = useProducts( state => state.product )

    useEffect( () => {
        const fetchData = async () => {
            await getSingleProduct( _id );
        };
        fetchData();
    }, [] );

    return (
        <div className="container">
            <div className="my-10 flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-10">

                <Image src={ `http://localhost:8000/${ product?.image }` } width={ 400 } height={ 100 } alt={ product?.title || "nike product" } />

                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-2xl">{ product?.title }</h1>
                    <p>{ product?.description }</p>
                    <div className="flex items-center gap-3 font-semibold">
                        <h3>{ product?.category }</h3>
                        <h3>{ product?.gender }</h3>
                        <h3>{ product?.ageGroup }</h3>
                    </div>
                    <h1 className="font-semibold">Price : <span className="text-blue-400"> ${ product?.price }</span></h1>

                    <Button className="mt-10" onClick={ () => addToCart( product!._id ) }>Add To Cart</Button>
                </div>
            </div>
        </div>
    )
}
