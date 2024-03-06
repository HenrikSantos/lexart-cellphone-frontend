"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import loginUser from "@/api/loginUser";

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
