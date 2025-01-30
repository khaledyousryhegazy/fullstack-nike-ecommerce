import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { fetchOrders } from "@/rtk/features/orders/OrdersThunk";
import { updateOrderStatus } from "@/services/orders";

export default function ChangeStatus( { orderId, status }: { orderId: string, status: string } ) {
    const { toast } = useToast()

    // axios staff
    const handleChange = async ( newStatus: string ) => {
        await updateOrderStatus( orderId, newStatus )
        fetchOrders( 1 )
        toast( {
            title: "Order Status",
            description: "Status Changed Successfully"
        } )
    }

    return (
        <div>
            <Select onValueChange={ handleChange }>
                <SelectTrigger className="w-[120px] capitalize">
                    <SelectValue placeholder={ status } />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}