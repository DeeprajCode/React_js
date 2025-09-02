'use client';

import { useState } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <html lang="en">
      <body className='antialiased'>
        <div className="flex min-h-screen">
          {showSidebar && <Sidebar />}
          <div className="flex-1">
            <Header sidebar={() => setShowSidebar(!showSidebar)} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
