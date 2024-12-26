import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <main className="h-[calc(100vh-60px-24px)]">
                <Outlet />
            </main>

            {/* Footer Section */ }
            <footer>
                <p className="font-semibold text-sm text-center">© 2024 Coded By Khaled</p>
            </footer>
        </div>
    );
}
