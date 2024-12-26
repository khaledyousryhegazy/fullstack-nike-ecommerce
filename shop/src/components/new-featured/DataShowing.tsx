'use client';
import { useEffect, useRef, useCallback } from "react";
import { useProducts } from "@/store/productStore";
import ProductCard from "../ProductCard";
import Loader from "../Loader";

export default function DataShowing() {
    const products = useProducts( ( state ) => state.products );
    const loader = useProducts( ( state ) => state.loader );
    const fetchProducts = useProducts( ( state ) => state.fetchProducts );
    const hasMore = useProducts( ( state ) => state.hasMore );

    const observer = useRef<IntersectionObserver | null>( null );

    const lastProductRef = useCallback(
        ( node: HTMLDivElement | null ) => {
            if ( !hasMore || loader ) return;

            if ( observer.current ) observer.current.disconnect();

            observer.current = new IntersectionObserver( ( entries ) => {
                if ( entries[ 0 ].isIntersecting ) {
                    fetchProducts();
                }
            } );

            if ( node ) observer.current.observe( node );
        },
        [ hasMore, loader, fetchProducts ]
    );

    useEffect( () => {
        fetchProducts(); // Initial load
    }, [ fetchProducts ] );

    return (
        <div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                { products.map( ( product, index ) => (
                    <div
                        key={ product._id || product.title }
                        ref={ index === products.length - 1 ? lastProductRef : null }
                    >
                        <ProductCard product={ product } />
                    </div>
                ) ) }
            </div>
            { loader && <Loader /> }
        </div>
    );
}
