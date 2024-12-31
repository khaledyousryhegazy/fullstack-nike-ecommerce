import { DollarSign, Package2, ShoppingBasket, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Statistics() {
    return (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Users */ }
            <div className="dashboard-box-style">
                <div className="flex justify-between items-center">
                    <h1>users</h1>
                    <Users />
                </div>
                <span className="block my-1 text-lg">2</span>
                <Link to={ '' } className="underline text-xs font-light text-blue-400 hover:no-underline">View all users</Link>
            </div>

            {/* Products */ }
            <div className="dashboard-box-style">
                <div className="flex justify-between items-center">
                    <h1>products</h1>
                    <Package2 />
                </div>
                <span className="block my-1 text-lg">2</span>
                <Link to={ '' } className="underline text-xs font-light text-blue-400 hover:no-underline">View all products</Link>
            </div>

            {/* Orders */ }
            <div className="dashboard-box-style">
                <div className="flex justify-between items-center">
                    <h1>orders</h1>
                    <ShoppingBasket />
                </div>
                <span className="block my-1 text-lg">2</span>
                <Link to={ '' } className="underline text-xs font-light text-blue-400 hover:no-underline">View all orders</Link>
            </div>

            {/* Earning */ }
            <div className="dashboard-box-style">
                <div className="flex justify-between items-center">
                    <h1>earning</h1>
                    <DollarSign />
                </div>
                <span className="block my-1 text-lg">0</span>
            </div>
        </div>
    )
}
