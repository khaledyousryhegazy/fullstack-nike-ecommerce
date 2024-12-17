"use client";

import { useMemo } from "react";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/store/productStore";

export default function Page() {
    // Extract stable values from Zustand store
    const searchValue = useProducts( ( state ) => state.searchValue );
    const loader = useProducts( ( state ) => state.loader );
    const message = useProducts( ( state ) => state.message );
    const searchWords = useProducts( ( state ) => state.value );

    // Memoize products to avoid unnecessary recomputation
    const stableProducts = useMemo( () => searchValue, [ searchValue ] );

    return (
        <div className={ `container min-h-screen ` }>
            { searchWords ? (
                loader ? (
                    <Loader />
                ) : stableProducts.length > 0 ? (
                    <div>
                        <h1 className="text-center text-gray-500 font-medium my-5">
                            Search Result For : <span className="font-semibold text-blue-400">{ searchWords }</span>
                        </h1>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 place-items-center">
                            { stableProducts.map( ( product ) => (
                                <ProductCard key={ product._id } product={ product } />
                            ) ) }
                        </div>
                    </div>
                ) : (
                    <h1 className="text-center text-gray-500 font-medium mt-5">
                        { message }
                    </h1>
                )
            ) : (
                <h1 className="text-center text-gray-500 font-medium mt-5">
                    Start searching by typing in the search bar! 🔍
                </h1>
            ) }
        </div>
    );
}
