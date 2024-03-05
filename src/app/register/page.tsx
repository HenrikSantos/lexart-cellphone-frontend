"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IRegisterResponse {
    token: string;
}

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const handleRegister = async(e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("As senhas não correspondem");

            return;
        }

        if (password.length < 3) {
            setMessage("A senha deve ter no mínimo 3 caracteres");

            return;
        }

        try {
            const response = await axios.post<IRegisterResponse>("http://localhost:4000/api/user", { email, password });
            setMessage("Registro bem-sucedido!");

            if ("token" in response.data) {
                localStorage.setItem("lexartCellphoneLogin", response.data.token);
                
                router.push("/cellphones");
            }
        } catch (error) {
            setMessage("Erro no registro");
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirme a senha" 
                    value={confirmPassword} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
