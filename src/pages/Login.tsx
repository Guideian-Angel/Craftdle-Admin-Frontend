import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1); // 1: login, 2: verify

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usernameOrEmail: email, password })
            });
            const data = await response.json();

            if (data.token) {
                sessionStorage.setItem("token", data.token); // 🔹 Token mentése state-be
                setStep(2);
            } else {
                alert("Hiba: " + data.message);
            }
        } catch (error) {
            alert("Hálózati hiba történt.");
        }
    };

    const handleVerify = async () => {
        try {
            console.log(sessionStorage.getItem("token"))
            const response = await fetch(`${API_BASE_URL}/verifyAdmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}` // 🔹 Token küldése a headerben
                },
                body: JSON.stringify({ code }) // 🔹 Csak a kód kell bodyban
            });
            const data = await response.json();
            console.log("Verify response:", data);

            if (data.adminVerification?.verified) {
                alert("Sikeres bejelentkezés!");

                // 🔹 User adatokat mentjük sessionStorage-be
                sessionStorage.setItem("adminData", JSON.stringify({
                    username: data.username,
                    id: data.id,
                    rights: Object.keys(data.adminRights).filter((key) => data.adminRights[key] === true),
                }));

                navigate("/users"); // 🔹 Átirányítás
            } else {
                alert("Hibás kód!");
            }
        } catch (error) {
            console.log(error)
            alert("Hálózati hiba történt.");
        }
    };

    return (
        <div>
            {step === 1 ? (
                <div id="login">
                    <h2>Bejelentkezés</h2>
                    <input 
                        type="text" placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Jelszó" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button 
                        onClick={handleLogin}
                    >
                        Belépés
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Email kód megerősítés</h2>
                    <input 
                        type="text" 
                        placeholder="Kód" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                    />
                    <button 
                        onClick={handleVerify}
                    >
                        Kód ellenőrzése
                    </button>
                </div>
            )}
        </div>
    );
}
