import { Products } from "@/interfaces/interfaces";
import { useCart } from "@/store/cartStore";
// import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";


interface IData {
    product: Products
}

export default function ProductCard( { product }: IData ) {

    const addToCart = useCart( ( state ) => state.addProduct );

    return (
        <div className="w-fit mx-auto " >
            <div className="w-fit block relative">
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img src={ `http://localhost:8000/${ product.image }` } className="min-w-[300px] w-full max-w-[441px]" alt={ product.title } />
                <IoBagHandleOutline size={ 26 } onClick={ () => addToCart( product._id ) } className="cursor-pointer absolute top-5 left-5 hover:text-blue-400" />
            </div>

            <div className="font-semibold text-sm flex items-center justify-between pt-2">
                <h3 className="capitalize">{ product.title }</h3>
                <h3>${ product.price }</h3>
            </div>
            <span className="capitalize text-sm font-semibold text-gray-800 ">{ product.gender }</span>
            <p className="capitalize text-sm text-gray-800 font-semibold">{ product.description }</p>
        </div>
    )
}
