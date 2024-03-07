"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import loginUser from "@/api/loginUser";
import Link from "next/link";
import lexWhite from "../../public/lex-white.svg";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const handleLogin = async(e: FormEvent) => {
        e.preventDefault();

        if (password.length < 3) {
            setMessage("A senha deve ter no mínimo 3 caracteres.");

            return;
        }

        const response = await loginUser(email, password);
        
        if (!response) {
            window.alert("Erro ao logar, verifique o status do servidor");

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

            <h2 className="my-2 text-xl">Login</h2>
            <form className="flex flex-wrap gap-3" onSubmit={handleLogin}>
                <input
                    className="w-full p-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <input
                    className="w-full p-2"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <button className="gradient-border w-full border p-2 hover:bg-white/20" type="submit">Entrar</button>
            </form>
            <br />
            <Link className="mx-auto w-full self-center border p-2 text-center hover:cursor-pointer hover:bg-white/20" href={"/register"}>Criar conta</Link>
            {message && <p className="my-3">{message}</p>}
        </main>
    );
}
