'use client'

import "./globals.css";
import {Inter} from "next/font/google";
import React, {useState} from "react";
import SideBar from "@/components/SideBar";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
    return (
        <html lang="en"><BodyLayout children={children}/></html>
    );
}

function BodyLayout({children}) {
    const [drawerOpen, setDrawerOpen] = useState(true);

    return (
        <body className={inter.className}>

        <header>
            <SideBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        </header>

        <main style={{marginLeft: drawerOpen ? '240px' : '0px', transition: 'margin-left 0.35s'}}>
            {children}
        </main>

        </body>
    )
}
