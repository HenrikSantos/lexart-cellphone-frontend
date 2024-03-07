import React from "react";
import Header from "@/components/Header/Header";
 
export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
