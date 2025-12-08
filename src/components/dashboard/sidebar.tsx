
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package2, Home, ShoppingCart, Users, LineChart, Package, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const { signOut } = useAuth()

    const routes = [
        {
            href: "/dashboard",
            label: "Orders",
            icon: ShoppingCart,
            active: pathname === "/dashboard",
        },
        // Add placeholders to make it look like a real dashboard
        {
            href: "/dashboard/customers",
            label: "Customers",
            icon: Users,
            active: pathname === "/dashboard/customers",
        },
        {
            href: "/dashboard/products",
            label: "Products",
            icon: Package,
            active: pathname === "/dashboard/products",
        },
        {
            href: "/dashboard/analytics",
            label: "Analytics",
            icon: LineChart,
            active: pathname === "/dashboard/analytics",
        },
    ]

    return (
        <div className={cn("pb-12 min-h-screen border-r bg-background", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex items-center px-4 mb-4 gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span>Acme Inc</span>
                    </div>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight">
                        Settings
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => signOut()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
