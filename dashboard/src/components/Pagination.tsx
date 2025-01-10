import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { Button } from "./ui/button";

export function TablePagination( { page, onPageChange, disable }: { page: number, onPageChange: ( newPage: number ) => void, disable: boolean } ) {

    const handlePrevious = () => {
        if ( page > 1 ) {
            onPageChange( page - 1 );
        }
    };

    const handleNext = () => {
        onPageChange( page + 1 );
    };

    return (
        <Pagination className="mt-10">
            <PaginationContent>
                <PaginationItem>
                    <Button variant="outline" disabled={ page === 0 } onClick={ handlePrevious } >Prev</Button>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>
                        { page }
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem >
                    <Button variant="outline" disabled={ disable } onClick={ handleNext } >Next</Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
