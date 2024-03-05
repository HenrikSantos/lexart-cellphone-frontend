"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ILoginResponse {
    id: number;
    email: string;
    token: string; 
}

export default function LoginForm(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const handleLogin = async(e: FormEvent) => {
        e.preventDefault();

        if (password.length < 3) {
            setMessage("A senha deve ter no mínimo 3 caracteres");

            return;
        }

        try {
            const response = await axios.post<ILoginResponse>(
                "http://localhost:4000/api/login",
                {
                    email,
                    password,
                }
            );

            if ("token" in response.data) {
                localStorage.setItem("lexartCellphoneLogin", response.data.token);
                
                router.push("/cellphones");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
