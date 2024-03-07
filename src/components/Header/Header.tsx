"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import lexWhite from "../../../public/lex-white.svg";

export default function Header() {
    const router = useRouter();
  
    const handleLogout = () => {
        localStorage.removeItem("lexartCellphoneLogin");
        
        router.push("/");
    };
  
    return (
        <header className="mx-auto flex w-full justify-center px-4 py-10 font-bold md:w-8/12 md:justify-between md:px-0">
            <Image className="hidden md:block" src={lexWhite} alt="Lexart logo" width={200} height={200}/>

            <nav className="flex items-center justify-between space-x-10">
                <Link className="border-b-2 border-black py-3 hover:border-blue-400" href="/cellphones">
                    Celulares
                </Link>

                <Link className="border-b-2 border-blue-400 py-3" href="/cellphones/create">
                    Adicionar Produto
                </Link>

                <button 
                    className="gradient-border border px-6 py-2 hover:bg-white/20" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
            
        </header>
    );
}
