"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import registerUser from "@/api/registerUser";

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
