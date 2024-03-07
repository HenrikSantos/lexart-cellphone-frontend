"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import registerUser from "@/api/registerUser";
import lexWhite from "../../../public/lex-white.svg";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    
    const router = useRouter();

    const handleRegister = async(e: FormEvent) => {
        e.preventDefault();

        if (password.length < 3) {
            setMessage("A senha deve ter no mínimo 3 caracteres.");

            return;
        }

        if (password !== confirmPassword) {
            setMessage("As senhas não correspondem.");

            return;
        }

        const response = await registerUser(email, password); 

        if (!response) {
            window.alert("Erro ao registrar, verifique o status do servidor");

            return;
        }

        if ("token" in response) {
            localStorage.setItem("lexartCellphoneLogin", response.token);
            
            router.push("/cellphones");
        }
    };

    return (
        <main className="mx-auto my-72 w-10/12 md:w-4/12">
            <Image className="my-7" src={lexWhite} alt="Lexart logo" width={200} height={200}/>
            <h2 className="my-2 text-xl">Registro:</h2>
            <form className="flex flex-wrap items-start justify-between gap-3" onSubmit={handleRegister}>
                <input
                    className="w-full p-2"
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                    required 
                />
                <input
                    className="w-full p-2" 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                    required 
                />
                <input
                    className="w-full p-2" 
                    type="password" 
                    placeholder="Confirme a senha" 
                    value={confirmPassword} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <button className="gradient-border w-full border p-2 hover:bg-white/20" type="submit">Registrar</button>
            </form>
            <br />
            <Link className="border p-2 hover:cursor-pointer hover:bg-white/20" href={"/"}>Login</Link>
            {message && <p className="my-3">{message}</p>}
        </main>
    );
}
