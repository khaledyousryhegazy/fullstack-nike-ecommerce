import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { fetchProducts } from "@/rtk/features/products/productThunk"
import { deleteProduct } from "@/services/products"
import { Trash2 } from "lucide-react"

export function DeleteProduct( { id }: { id: string } ) {
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const handleDelete = async () => {
        if ( !id ) return

        await deleteProduct( id )

        dispatch( fetchProducts( 1 ) )

        toast( {
            description: "Product Deleted Successfully",
        } )

    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash2 size={ 20 } className="cursor-pointer hover:text-red-600" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Confirm</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are You Sure About Deleting This Product ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={ handleDelete }>Yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}