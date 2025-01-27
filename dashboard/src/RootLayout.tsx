import { useLocation } from "react-router-dom";
import App from "./App.tsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.tsx";
import { AppSidebar } from "./components/app-sidebar.tsx";
import Navbar from "./components/Navbar.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

export default function RootLayout() {
  const location = useLocation();

  // Define routes where layout is NOT applied
  const noLayoutRoutes = [ "/register", "/login" ];

  // Check if the current route matches any no-layout route
  const isNoLayoutRoute = noLayoutRoutes.some( ( route ) => location.pathname.startsWith( route ) );

  if ( isNoLayoutRoute ) {
    // Render the app without layout components
    return (
      <div>
        <div className="flex flex-row-reverse p-2.5">
          <Navbar />
        </div>
        <App />
        <Toaster />
      </div>
    )
  }

  // Render the app with layout components
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full px-3">
        <div className="flex flex-row-reverse py-2.5">
          <Navbar />
          <SidebarTrigger />
        </div>
        <App />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
