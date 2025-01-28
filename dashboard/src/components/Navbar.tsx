import {
    LogIn,
    LogOut,
    // LogOut,
    User,
    User2,
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
import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { useSelector } from "react-redux"
import { authIsLoggedIn } from "@/rtk/features/protect-routes/authSelectors"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { authLogout } from "@/rtk/features/protect-routes/auth"

export default function Navbar() {

    const isLoggedIn = useSelector( authIsLoggedIn )
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <div className="w-full flex gap-2 justify-end">
            <ModeToggle />

            <DropdownMenu>
                <DropdownMenuTrigger asChild className="p-3">
                    <Button variant="outline"><User /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Account Info</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    { !isLoggedIn ?
                        <DropdownMenuItem>
                            <LogIn />
                            <Link to={ '/login' }>
                                <span>Login</span>
                            </Link>
                        </DropdownMenuItem>
                        :
                        <div>
                            <Link to={ '/user-profile' }>
                                <DropdownMenuItem className="cursor-pointer">
                                    <User2 />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem className="cursor-pointer" onClick={ () => {
                                dispatch( authLogout() )
                                navigate( '/login' )
                            } }>
                                <LogOut />
                                <span>logout</span>
                            </DropdownMenuItem>
                        </div>
                    }
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}
