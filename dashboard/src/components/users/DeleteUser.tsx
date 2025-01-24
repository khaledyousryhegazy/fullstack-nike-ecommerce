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
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUsers } from "@/rtk/features/users/UsersThunk";
import { deleteUser } from "@/services/users";
import { Trash2 } from "lucide-react";

export default function DeleteUser( { id }: { id: string } ) {


    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const handleDelete = async () => {
        if ( !id ) return

        await deleteUser( id )

        dispatch( fetchUsers( 1 ) )

        toast( {
            description: "User Deleted Successfully",
        } )

    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Trash2 size={ 20 } className="cursor-pointer hover:text-red-600" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure about deleting this user and blocking him from your platform ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction onClick={ handleDelete }>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}