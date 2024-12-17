'use client'
import Image from "next/image";
import logo from "@/assets/icons/sub-nav-logo.svg";
import Link from "next/link";
import style from "./navbar.module.css";
import { useAuth } from "@/context/AuthContext";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function SubNavbar() {
    const auth = useAuth();
    const [ isClient, setIsClient ] = useState( false );

    useEffect( () => {
        setIsClient( true );
    }, [] );

    if ( !isClient ) {
        return null;
    }

    const user = auth?.user;

    return (
        <div>
            <div className="container">
                <div className="flex w-full justify-between items-center py-1">

                    {/* logo */ }
                    <div>
                        <Image src={ logo } width={ 24 } height={ 24 } alt="nike-logo" />
                    </div>

                    {/* links */ }
                    <div>
                        <ul className={ `${ style.links } flex gap-3 items-center text-sm` }>
                            <li>
                                <Link href={ '/contact' }>Help</Link>
                            </li>
                            { isClient && !auth?.token ? (
                                <>
                                    <li>
                                        <Link href={ '/sign-up' }>Sign Up</Link>
                                    </li>
                                    <li>
                                        <Link href={ '/login' }>Join Us</Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Menu>
                                        <MenuHandler>
                                            <Button className="rounded-full w-7 h-7 p-0">
                                                { user?.username?.charAt( 0 ).toUpperCase() || "U" }
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem onClick={ auth.logoutAction }>Logout</MenuItem>
                                            <MenuItem>Profile</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </li>
                            )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
