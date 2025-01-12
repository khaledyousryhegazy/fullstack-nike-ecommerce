
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import SubNavbar from "@/components/navbar/SubNavbar";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/context/AuthContext";
import ProtectRoutes from "@/components/ProtectRoutes";

const geistSans = localFont( {
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
} );
const geistMono = localFont( {
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
} );

export const metadata: Metadata = {
  title: "Nike",
  description: "Fullstack Nike Store",
};

export default function RootLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/icon.svg" type="image/svg" />

      <body
        className={ `${ geistSans.variable } ${ geistMono.variable } antialiased` }
      >
        <AuthProvider>
          <ProtectRoutes>
            <SubNavbar />
            <Navbar />
            <main style={ { minHeight: 'calc(100vh - 132px - 424px)' } }>
              { children }
            </main>
            <Footer />
          </ProtectRoutes>
        </AuthProvider>

      </body>
    </html>
  );
}
