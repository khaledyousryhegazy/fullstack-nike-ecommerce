'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { selectProducts } from "@/rtk/features/productSelectors";
import { fetchProducts } from "@/rtk/features/productThunk";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import { DeleteProduct } from "./DeleteProduct";

export default function ProductsTable() {

    const dispatch = useAppDispatch();
    const products = useSelector( selectProducts );

    useEffect( () => {
        dispatch( fetchProducts() );
    }, [ dispatch ] );

    // console.log( "🚀 ~ ProductsTable ~ products:", products )


    return (
        <div>
            <div className="flex justify-end my-10">
                <AddProductForm />
            </div>

            <Table>
                <TableCaption>All Products From Your Store</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Age Group</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { products?.map( item => (
                        <TableRow key={ item?._id }>
                            <TableCell className="flex items-center gap-2 min-  w-40 ">
                                <img src={ `http://localhost:8000/${ item?.image }` } className="w-10 h-10 object-cover" alt={ item?.title } />
                                <h3 className="text-nowrap w-full overflow-hidden text-ellipsis">
                                    { item?.title }
                                </h3>
                            </TableCell>

                            <TableCell>{ item?.category }</TableCell>
                            <TableCell>{ item?.gender }</TableCell>
                            <TableCell>{ item?.ageGroup }</TableCell>
                            <TableCell>$ { item?.price }</TableCell>

                            <TableCell className="flex items-center gap-2">
                                <EditProductForm />
                                <DeleteProduct />
                            </TableCell>
                        </TableRow>
                    ) ) }
                </TableBody>
            </Table>
        </div>
    );
}