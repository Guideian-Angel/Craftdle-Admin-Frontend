import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1); // 1: login, 2: verify

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3000/admin/login", {
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
            const response = await fetch("http://localhost:3000/admin/verifyAdmin", {
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
        <div className="flex flex-col items-center justify-center h-screen text-white">
            {step === 1 ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Bejelentkezés</h2>
                    <input 
                        className="w-full p-2 mb-2 bg-gray-700 border-none rounded" 
                        type="text" placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        className="w-full p-2 mb-2 bg-gray-700 border-none rounded" 
                        type="password" 
                        placeholder="Jelszó" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" 
                        onClick={handleLogin}
                    >
                        Belépés
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Email kód megerősítés</h2>
                    <input 
                        className="w-full p-2 mb-2 bg-gray-700 border-none rounded" 
                        type="text" 
                        placeholder="Kód" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                    />
                    <button 
                        className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded" 
                        onClick={handleVerify}
                    >
                        Kód ellenőrzése
                    </button>
                </div>
            )}
        </div>
    );
}
