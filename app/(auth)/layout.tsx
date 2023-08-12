import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css'


import Topbar from "@/components/shared/Topbar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Bottombar from "@/components/shared/Bottombar"

export const metadata = {
    title: "Threads",
    description: "An app with next.js",
}

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({children}: {children: React.ReactNode}) {
    return <ClerkProvider>
        <html lang="en">
            <body className={`${inter.className} bg-dark-1`}>
                {children}
            </body>
        </html>
    </ClerkProvider>
}