import { Users, LayoutDashboard, Package2, ShoppingBasket } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        id: 1,
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        id: 2,
        title: "Products",
        url: "/products",
        icon: Package2,
    },
    {
        id: 3,
        title: "Users",
        url: "/users",
        icon: Users,
    },
    {
        id: 4,
        title: "Orders",
        url: "/orders",
        icon: ShoppingBasket,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col justify-between">
                        <SidebarMenu>
                            { items.map( ( item ) => (
                                <SidebarMenuItem key={ item.id }>
                                    <SidebarMenuButton asChild>
                                        <a className="font-semibold" href={ item.url }>
                                            <item.icon />
                                            <span>{ item.title }</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) ) }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
