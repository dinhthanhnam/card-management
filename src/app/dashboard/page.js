import SidebarNavigation from "@/components/Navigation/SidebarNavigation";

export default function DashboardPage() {
    return (
        <div>
            <div className="max-w-full min-h-screen rounded-xl border-fuchsia-300">
                <div className="h-full w-60 flex-col fixed inset-y-0 z-50">
                    <SidebarNavigation />
                </div>
            </div>
        </div>
    );
}
