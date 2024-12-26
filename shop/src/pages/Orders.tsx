'use client';

import { OrderArray } from "@/interfaces/interfaces";
import { useCart } from "@/store/cartStore";
import { useEffect } from "react";
import {
    Card,
    Typography,
    CardBody,
    Chip,
} from "@material-tailwind/react";

const TABLE_HEAD = [
    "Title",
    "Price",
    "Quantity",
    "Status",
    "Total",
    "Address",
    "Payment Method",
];

export default function Orders() {
    const getAllOrders = useCart( ( state ) => state.getAllOrders );
    const orders = useCart( ( state ) => state.orders );
    console.log( "🚀 ~ Orders ~ orders:", orders )

    useEffect( () => {
        const fetchData = async () => {
            await getAllOrders();
        };

        fetchData();
    }, [] );

    const total = orders?.orders?.reduce( ( acc, curr ) => acc + curr.totalAmount, 0 )

    return (
        <div className="container">
            { orders?.orders.length ? (
                <div>
                    <h1 className="font-semibold border-b w-fit border-blue-400 pb-2">Total Orders : ${ total?.toFixed( 2 ) }</h1>
                    <Card className="h-full w-full pt-2">
                        <CardBody className="overflow-auto px-0">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        { TABLE_HEAD.map( ( head ) => (
                                            <th
                                                key={ head }
                                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    { head }
                                                </Typography>
                                            </th>
                                        ) ) }
                                    </tr>
                                </thead>
                                <tbody>
                                    { orders?.orders?.map( ( order: OrderArray, idx: number ) => {
                                        const isLast = idx === orders.orders.length - 1;
                                        const rowClass = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";
                                        return order.items.map( ( item, itemIdx ) => (
                                            <tr key={ `${ order._id }-${ itemIdx }` }>
                                                {/* Title */ }
                                                <td className={ rowClass }>
                                                    <Typography variant="small" className="font-bold flex items-center gap-2">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                                                        <img src={ `http://localhost:8000/${ item.product.image }` } className="w-14 object-contain" alt={ item.product.title } />
                                                        { item.product.title }
                                                    </Typography>
                                                </td>

                                                {/* Price */ }
                                                <td className={ rowClass }>
                                                    <Typography variant="small" className="font-normal">
                                                        ${ item.product.price.toFixed( 2 ) }
                                                    </Typography>
                                                </td>

                                                {/* Quantity */ }
                                                <td className={ rowClass }>
                                                    <Typography variant="small" className="font-normal">
                                                        { item.quantity }
                                                    </Typography>
                                                </td>

                                                {/* Status */ }
                                                <td className={ `${ rowClass } text-center` }>
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={ order.status }
                                                        color={
                                                            order.status === "paid"
                                                                ? "green"
                                                                : order.status === "pending"
                                                                    ? "amber"
                                                                    : "red"
                                                        }
                                                    />
                                                </td>

                                                {/* Total */ }
                                                <td className={ rowClass }>
                                                    <Typography variant="small" className="font-normal">
                                                        ${ order.totalAmount.toFixed( 2 ) }
                                                    </Typography>
                                                </td>

                                                {/* Address */ }
                                                <td className={ rowClass }>
                                                    <Typography variant="small" className="font-normal">
                                                        { order.shippingAddress }
                                                    </Typography>
                                                </td>

                                                {/* Payment Method */ }
                                                <td className={ rowClass }>
                                                    <Typography variant="small" className="font-normal">
                                                        { order.paymentMethod }
                                                    </Typography>
                                                </td>
                                            </tr>
                                        ) );
                                    } ) }
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </div>
            ) :
                <h1 className="font-semibold text-lg text-center my-14">No Orders Yet 😢</h1>
            }
        </div>
    );
}
