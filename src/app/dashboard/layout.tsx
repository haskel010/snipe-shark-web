
import { Sidebar, MobileSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <div className="hidden md:block w-64 shrink-0">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px] md:hidden">
                    <MobileSidebar />
                    <span className="font-semibold">Dashboard</span>
                </header>
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
