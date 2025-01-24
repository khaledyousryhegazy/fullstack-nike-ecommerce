'use client';
import MainTitle from "../MainTitle";
import moment from 'moment';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TablePagination } from "../Pagination";
import { useEffect, useState } from "react";
import DeleteUser from "./DeleteUser";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUsers } from "@/rtk/features/users/UsersThunk";
import { useSelector } from "react-redux";
import { selectLoading, selectUsers } from "@/rtk/features/users/usersSelectors";
import { LoadingSpinner } from "../LoadingSpinner";
export default function UsersTable() {
    const dispatch = useAppDispatch()
    const users = useSelector( selectUsers );
    const loading = useSelector( selectLoading );
    const [ page, setPage ] = useState<number>( 1 );
    const [ disable, setDisable ] = useState<boolean>( false );

    useEffect( () => {
        dispatch( fetchUsers( page ) );
        setDisable( users.length == 0 )
    }, [ dispatch, page, users.length ] );

    return (
        <div>
            <div className="w-fit my-10">
                <MainTitle text="Users" />
            </div>

            <div>
                { loading ? <LoadingSpinner /> : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Joined In</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={ 6 } className="capitalize text-center">
                                        There's no users to show.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map( user => (
                                    <TableRow key={ user._id }>
                                        <TableCell>{ user.username }</TableCell>
                                        <TableCell>{ user.email }</TableCell>
                                        <TableCell>   { moment( user.createdAt ).format( 'DD-MM-YYYY' ) }</TableCell>
                                        <TableCell>
                                            <DeleteUser id={ user._id || '' } />
                                        </TableCell>
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