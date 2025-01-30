import { useAppDispatch } from "@/hooks/useAppDispatch";
import { selectOrders, selectOrdersLoading } from "@/rtk/features/orders/ordersSelectors";
import { fetchOrders } from "@/rtk/features/orders/OrdersThunk";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainTitle from "../MainTitle";
import { LoadingSpinner } from "../LoadingSpinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import { TablePagination } from "../Pagination";
import moment from "moment";
import ChangeStatus from "./ChangeStatus";

export default function OrdersTable() {
    const dispatch = useAppDispatch();
    const orders = useSelector( selectOrders );
    const loading = useSelector( selectOrdersLoading );
    const [ page, setPage ] = useState<number>( 1 );
    const [ disable, setDisable ] = useState<boolean>( false );

    useEffect( () => {
        dispatch( fetchOrders( page ) );
        setDisable( orders.length == 0 )
    }, [ dispatch, page, orders.length ] );

    return (
        <div>
            <div className="w-fit my-10">
                <MainTitle text="orders" />
            </div>

            <div>
                { loading ? <LoadingSpinner /> : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Address</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Products Count</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { disable ?
                                <TableRow>
                                    <TableCell colSpan={ 6 } className="capitalize text-center">
                                        There's no users to show.
                                    </TableCell>
                                </TableRow>
                                : ( orders?.map( ( item ) => (
                                    <TableRow key={ item?._id }>
                                        <TableCell>{ item?.shippingAddress }</TableCell>
                                        <TableCell>{ item?.paymentMethod }</TableCell>
                                        <TableCell>{ item?.items?.length }</TableCell>
                                        <TableCell>$ { item?.totalAmount }</TableCell>
                                        <TableCell>
                                            <ChangeStatus orderId={ item?._id } status={ item?.status } />
                                        </TableCell>
                                        <TableCell>{ moment( item?.createdAt ).format( 'DD/MM/YYYY' ) }</TableCell>
                                        <TableCell>{ moment( item?.updatedAt ).format( 'DD/MM/YYYY' ) }</TableCell>
                                    </TableRow>
                                ) )
                                ) }
                        </TableBody>
                    </Table>
                ) }
                <TablePagination disable={ disable } page={ page } onPageChange={ setPage } />
            </div>
        </div>
    );
}
