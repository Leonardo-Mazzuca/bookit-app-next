import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "../assets/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthWrapper from "@/components/auth-wrapper";

const inter = Inter({
   subsets: ["latin"],
   variable: "--font-inter",
   weight: ['400']
});

export const metadata: Metadata = {
  title: "Bookit app | Book a room",
  description: "Book meeting or conforts room for your team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <AuthWrapper>

        <html lang="en">
          <body
            className={`${inter.className} antialiased`}
          > 
          
            <Header />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

              {children}

            </main>

            <Footer />
            <ToastContainer />

          </body>
        </html>

    </AuthWrapper>


  );
}
