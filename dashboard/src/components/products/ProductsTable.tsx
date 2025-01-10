'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { selectLoading, selectProducts } from "@/rtk/features/productSelectors";
import { fetchProducts } from "@/rtk/features/productThunk";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import { DeleteProduct } from "./DeleteProduct";
import { LoadingSpinner } from "../LoadingSpinner";
import { TablePagination } from "../Pagination";
import MainTitle from "../MainTitle";
import booster from "@/assets/booster.jpg"

export default function ProductsTable() {
    const dispatch = useAppDispatch();
    const products = useSelector( selectProducts );
    const loading = useSelector( selectLoading );
    const [ page, setPage ] = useState<number>( 1 );
    const [ disable, setDisable ] = useState<boolean>( false );

    useEffect( () => {
        dispatch( fetchProducts( page ) );
        setDisable( products.length == 0 )
    }, [ dispatch, page, products.length ] );

    return (
        <div>
            <div className="flex justify-between my-10">
                <MainTitle text={ "products" } />
                <AddProductForm />
            </div>

            { loading ? (
                <LoadingSpinner />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Age Group</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={ 6 } className="capitalize text-center">
                                    There's no more products to show.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map( ( item ) => (
                                <TableRow key={ item?._id }>
                                    <TableCell className="flex items-center gap-2 min-w-40">
                                        <img
                                            src={ item?.image ? `http://localhost:8000/${ item?.image }` : booster }
                                            className="w-10 h-10 object-cover"
                                            alt={ item?.title }
                                        />
                                        <h3 className="text-nowrap w-full overflow-hidden text-ellipsis">
                                            { item?.title }
                                        </h3>
                                    </TableCell>

                                    <TableCell>{ item?.category }</TableCell>
                                    <TableCell>{ item?.gender }</TableCell>
                                    <TableCell>{ item?.ageGroup }</TableCell>
                                    <TableCell>$ { item?.price }</TableCell>

                                    <TableCell className="flex items-center gap-2">
                                        <EditProductForm product={ item } />
                                        <DeleteProduct />
                                    </TableCell>
                                </TableRow>
                            ) )
                        ) }
                    </TableBody>
                </Table>
            ) }
            <TablePagination page={ page } onPageChange={ setPage } disable={ disable } />
        </div>
    );
}
