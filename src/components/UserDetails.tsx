import { useState, useEffect } from "react";
import PlayedGamemodesChart from "./PlayedGamemodesChart";

interface UserDetailsProps {
    userId: number;
    onClose: () => void;
}

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function UserDetails({ userId, onClose }: UserDetailsProps) {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => console.error("Error:", error));
    }, [userId]);

    return userData && !userData.error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 text-white rounded-lg w-1/3 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">✖</button>
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <p>Username: {userData.username}</p>
                <p>Streak: {userData.streak.currentStreak ?? "0"}</p>
                <p>Achievements: {userData.achievements.collected + "/" + userData.achievements.total}</p>
                <p>Collection: {userData.collection.collected + "/" + userData.collection.total}</p>
                <p>Registration Date: {new Date(userData.registration_date).toLocaleDateString()}</p>
                <p>Favourite Gamemode: {userData.favoriteGamemode}</p>
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Gamemode Distribution</h3>
                    <PlayedGamemodesChart rawData={userData.playedGamemodes} />
                </div>
            </div>
        </div>
    );
}