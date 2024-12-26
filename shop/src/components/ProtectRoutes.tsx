'use client'
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface ProtectedRotesProps {
    children: ReactNode
}

const ProtectRoutes: React.FC<ProtectedRotesProps> = ( { children } ) => {
    const { token, user } = useAuth()
    const router = useRouter()

    useEffect( () => {
        if ( !token || !user ) {
            router.push( '/login' )
        }
    }, [ user, token, router ] )

    return (
        <>
            { children }
        </>
    )
}

export default ProtectRoutes