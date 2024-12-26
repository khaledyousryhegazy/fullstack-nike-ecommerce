import {
    LogIn,
    // LogOut,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
    return (
        <div className="w-full flex gap-2 justify-end">
            <ModeToggle />

            <DropdownMenu>
                <DropdownMenuTrigger asChild className="p-3">
                    <Button variant="outline"><User /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <LogIn />
                        <Link to={ '/login' }>
                            <span>Login</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}
