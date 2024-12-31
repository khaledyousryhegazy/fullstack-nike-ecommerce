import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="">
            <main className="min-h-[calc(100vh-60px-68px)]">
                <Outlet />
            </main>

            {/* Footer Section */ }
            <footer className="mt-10 mb-2">
                <p className="font-semibold text-sm text-center">© 2024 Coded By Khaled</p>
            </footer>
        </div>
    );
}
