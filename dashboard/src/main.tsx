import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx'
import { AppSidebar } from './components/app-sidebar.tsx'
import Navbar from './components/Navbar.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './rtk/store.ts'

createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <Provider store={ store }>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <SidebarProvider>
            <AppSidebar />
            <div className='flex flex-col w-full px-3'>
              <div className='flex flex-row-reverse py-2.5'>
                <Navbar />
                <SidebarTrigger />
              </div>
              <App />
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
